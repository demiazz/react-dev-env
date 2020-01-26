import { paramCase } from "param-case";
import {
  Attribute,
  DefaultTreeDocument,
  DefaultTreeElement,
  DefaultTreeParentNode,
  DefaultTreeTextNode,
  parse,
  serialize
} from "parse5";

import { Manifest } from "./types";

type AttributesMap = Record<string, string | undefined>;

function toHTMLAttributes(attributes: AttributesMap): Attribute[] {
  const result: Attribute[] = [];

  for (const key of Object.keys(attributes)) {
    const value = attributes[key];

    if (!value) {
      continue;
    }

    result.push({
      name: paramCase(key),
      value
    });
  }

  return result;
}

function findAttribute(
  { attrs: attributes }: DefaultTreeElement,
  attributeName: string
): Attribute | undefined {
  return attributes.find(({ name }) => name === attributeName);
}

function appendOrUpdateAttribute(
  node: DefaultTreeElement,
  name: string,
  value: string
) {
  const attributes = node.attrs.filter(attribute => attribute.name !== name);

  attributes.push({ name, value });

  node.attrs = attributes;
}

function appendTextNode(parentNode: DefaultTreeParentNode, value: string) {
  parentNode.childNodes.push({
    nodeName: "#text",
    value,
    parentNode
  } as DefaultTreeTextNode);
}

function appendTitleTag(parentNode: DefaultTreeParentNode, title: string) {
  const titleTag = {
    attrs: [],
    childNodes: [],
    namespaceURI: "http://www.w3.org/1999/xhtml",
    nodeName: "title",
    parentNode,
    tagName: "title"
  };

  appendTextNode(titleTag, title);

  parentNode.childNodes.push(titleTag);
}

function appendOrUpdateTitleTag(
  parentNode: DefaultTreeParentNode,
  title: string
) {
  parentNode.childNodes = parentNode.childNodes.filter(
    ({ nodeName }) => nodeName !== "title"
  );

  appendTitleTag(parentNode, title);
}

function appendLinkTag(
  parentNode: DefaultTreeParentNode,
  attributes: AttributesMap
) {
  parentNode.childNodes.push({
    attrs: toHTMLAttributes(attributes),
    childNodes: [],
    namespaceURI: "http://www.w3.org/1999/xhtml",
    nodeName: "link",
    parentNode,
    tagName: "link"
  } as DefaultTreeElement);
}

function appendMetaTag(
  parentNode: DefaultTreeParentNode,
  name: string,
  content: string
) {
  parentNode.childNodes.push({
    attrs: toHTMLAttributes({
      name,
      content
    }),
    childNodes: [],
    namespaceURI: "http://www.w3.org/1999/xhtml",
    nodeName: "meta",
    parentNode,
    tagName: "meta"
  } as DefaultTreeElement);
}

function sortNodes(nodes: DefaultTreeElement[]): DefaultTreeElement[] {
  const links = [];
  const meta = [];
  const other = [];
  const scripts = [];
  const styles = [];
  const title = [];

  for (const node of nodes) {
    switch (node.nodeName) {
      case "link": {
        const relAttribute = findAttribute(node, "rel");

        if (relAttribute?.value === "stylesheet") {
          styles.push(node);
        } else {
          links.push(node);
        }

        break;
      }
      case "meta": {
        meta.push(node);

        break;
      }
      case "script": {
        scripts.push(node);

        break;
      }
      case "style": {
        styles.push(node);

        break;
      }
      case "title": {
        title.push(node);

        break;
      }
      default: {
        other.push(node);
      }
    }
  }

  return ([] as DefaultTreeElement[]).concat(
    meta,
    title,
    links,
    styles,
    scripts,
    other
  );
}

export function injectToHTML(
  source: string,
  { appIcons, description, favIcon, lang, name, src, themeColor }: Manifest
): string {
  const document = parse(source) as DefaultTreeDocument;
  const html = document.childNodes[1] as DefaultTreeElement;
  const head = html.childNodes[0] as DefaultTreeElement;

  appendLinkTag(head, {
    href: favIcon.src,
    rel: "icon"
  });

  appendLinkTag(head, {
    href: src,
    rel: "manifest"
  });

  if (appIcons) {
    const appleTouchIcons = appIcons.filter(
      ({ appleTouchIcon }) => appleTouchIcon
    );

    if (appleTouchIcons.length === 1) {
      const { src } = appleTouchIcons[0];

      appendLinkTag(head, {
        href: src,
        rel: "apple-touch-icon"
      });
    } else if (appleTouchIcons.length > 1) {
      for (const { src, sizes } of appleTouchIcons) {
        appendLinkTag(head, {
          href: src,
          rel: "apple-touch-icon",
          sizes
        });
      }
    }
  }

  appendOrUpdateTitleTag(head, name);

  if (lang) {
    appendOrUpdateAttribute(html, "lang", lang);
  }

  if (description) {
    appendMetaTag(head, "description", description);
  }

  if (themeColor) {
    appendMetaTag(head, "theme-color", themeColor);
  }

  head.childNodes = sortNodes(head.childNodes as DefaultTreeElement[]);

  return serialize(document);
}
