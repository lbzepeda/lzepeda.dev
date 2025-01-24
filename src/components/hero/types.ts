export interface Title {
  textParts: readonly {
    text: string;
    className: string;
  }[];
}

export interface CursorRef {
  element: HTMLSpanElement | null;
}

export interface TitlePart {
  text: string;
  className: string;
}

export interface CursorRef {
  element: HTMLSpanElement | null;
}

export interface TypingState {
  currentText: string;
  currentIndex: number;
  isDeleting: boolean;
  isComplete: boolean;
}
