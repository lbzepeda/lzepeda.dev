export function clickOutside(node: HTMLElement, handler: () => void) {
  const handleClick = (event: MouseEvent) => {
    const target = event.target as Node;
    if (
      !node.contains(target) &&
      !target.parentElement?.classList.contains("mobile-menu")
    ) {
      handler();
    }
  };

  document.addEventListener("click", handleClick);

  return {
    destroy() {
      document.removeEventListener("click", handleClick);
    },
  };
}
