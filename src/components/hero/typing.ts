import { writable } from "svelte/store";
import type { CursorRef, Title, TitlePart, TypingState } from "./types";

export function createTypingAnimation(titles: Title[], cursorRef?: CursorRef) {
  const { subscribe, update } = writable<TypingState>({
    currentText: "",
    currentIndex: 0,
    isDeleting: false,
    isComplete: false,
  });

  let timeoutId: ReturnType<typeof setTimeout>;

  function updateCursor(isVisible: boolean) {
    if (cursorRef?.element) {
      cursorRef.element.style.opacity = isVisible ? "1" : "0";
      cursorRef.element.style.transition = "opacity 0.3s";
    }
  }

  function getFullText(index: number): string {
    return titles[index].textParts.map((part: TitlePart) => part.text).join("");
  }

  function handleTyping() {
    let currentState: TypingState | undefined;
    subscribe((s) => (currentState = s))();

    if (!currentState) return;

    const currentFullText = getFullText(currentState.currentIndex);
    updateCursor(!currentState.isComplete);

    if (
      !currentState.isDeleting &&
      currentState.currentText.length < currentFullText.length
    ) {
      timeoutId = setTimeout(() => {
        update((s) => ({
          ...s,
          currentText: currentFullText.slice(0, s.currentText.length + 1),
        }));
        handleTyping();
      }, 100);
    } else if (currentState.isDeleting && currentState.currentText.length > 0) {
      timeoutId = setTimeout(() => {
        update((s) => ({
          ...s,
          currentText: s.currentText.slice(0, -1),
        }));
        handleTyping();
      }, 50);
    } else if (
      !currentState.isDeleting &&
      currentState.currentText.length === currentFullText.length
    ) {
      if (currentState.currentIndex < titles.length - 1) {
        timeoutId = setTimeout(() => {
          update((s) => ({ ...s, isDeleting: true }));
          handleTyping();
        }, 2000);
      } else {
        update((s) => ({ ...s, isComplete: true }));
        updateCursor(false);
      }
    } else if (
      currentState.isDeleting &&
      currentState.currentText.length === 0
    ) {
      update((s) => ({
        ...s,
        isDeleting: false,
        currentIndex: (s.currentIndex + 1) % titles.length,
        currentText: "",
      }));
      handleTyping();
    }
  }

  return {
    subscribe,
    start: () => handleTyping(),
    destroy: () => {
      if (timeoutId) clearTimeout(timeoutId);
      updateCursor(false);
    },
    cursorRef,
  };
}
