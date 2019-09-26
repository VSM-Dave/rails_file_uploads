export function getMetaValue(name): string {
  const element = findElement(document.head, `meta[name="${name}"]`);
  if (element) {
    return element.getAttribute("content");
  }
}

export function findElement(root: Document | HTMLElement = document, selector: string): HTMLElement {
  return root.querySelector(selector);
}

export function removeElement(el: HTMLElement): void {
  if (el && el.parentNode) {
    el.parentNode.removeChild(el);
  }
}

export function insertAfter(el: HTMLElement, referenceNode: HTMLElement): HTMLElement {
  return referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
}