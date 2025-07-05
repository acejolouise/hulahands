import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { 
  IonButton, 
  IonCard, 
  IonCardContent, 
  IonCardHeader, 
  IonCardTitle,
  IonItem
} from '@ionic/react';
import './QuizComponent.css';

interface QuizComponentProps {
  onClose: () => void;
  level?: number;
}

interface QuizQuestion {
  id: number;
  level: string; 
  question: string;
  options: string[];
  mediaType: 'video' | 'image' | 'none';
  mediaPath?: string;
  correctAnswer: string;
  optionsAreMedia?: boolean;
  showQuestionMedia?: boolean;
  optionMediaType?: 'video' | 'image' | 'mixed';
  optionMediaPaths?: { [key: string]: { type: 'video' | 'image', path: string } };
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    level: 'level1',
    question: "Which video shows the right sign for letter A?",
    options: [
      "B",
      "A",
      "E",
      "C"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "b. A",
    optionsAreMedia: true,
    showQuestionMedia: false,
    optionMediaType: 'video',
    optionMediaPaths: {
      'B': { type: 'video', path: '/assets/level1vids/B.mp4' },
      'A': { type: 'video', path: '/assets/level1vids/A.mp4' },
      'E': { type: 'video', path: '/assets/level1vids/E.mp4' },
      'C': { type: 'video', path: '/assets/level1vids/C.mp4' }
    }
  },
  {
    id: 2,
    level: 'level1',
    question: "What is the correct letter shown in the picture?",
    options: [
      "D",
      "I",
      "B",
      "E"
    ],
    mediaType: 'image',
    mediaPath: '/assets/level1pics/B.png',
    correctAnswer: "c. B",
    optionsAreMedia: false
  },
  {
    id: 3,
    level: 'level1',
    question: "What letter is this?",
    options: [
      "C",
      "G",
      "D",
      "B"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level1vids/C.mp4',
    correctAnswer: "a. C",
    optionsAreMedia: false
  },
  {
    id: 4,
    level: 'level1',
    question: "Which video shows the correct sign for the letter D?",
    options: [
      "I",
      "F",
      "H",
      "D"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "d. D",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'I': { type: 'video', path: '/assets/level1vids/I.mp4' },
      'F': { type: 'video', path: '/assets/level1vids/F.mp4' },
      'H': { type: 'video', path: '/assets/level1vids/H.mp4' },
      'D': { type: 'video', path: '/assets/level1vids/D.mp4' }
    }
  },
  {
    id: 5,
    level: 'level1',
    question: "Which picture matches the correct sign for letter E?",
    options: [
      "E",
      "A",
      "J",
      "B"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "a. E",
    optionsAreMedia: true,
    optionMediaType: 'image',
    optionMediaPaths: {
      'E': { type: 'image', path: '/assets/level1pics/E.png' },
      'A': { type: 'image', path: '/assets/level1pics/A.png' },
      'J': { type: 'image', path: '/assets/level1pics/J.png' },
      'B': { type: 'image', path: '/assets/level1pics/B.png' }
    }
  },
  {
    id: 6,
    level: 'level1',
    question: "Which video matches the correct sign for the letter F?",
    options: [
      "A",
      "D",
      "G",
      "F"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "d. F",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'A': { type: 'video', path: '/assets/level1vids/A.mp4' },
      'D': { type: 'video', path: '/assets/level1vids/D.mp4' },
      'G': { type: 'video', path: '/assets/level1vids/G.mp4' },
      'F': { type: 'video', path: '/assets/level1vids/F.mp4' }
    }
  },
  {
    id: 7,
    level: 'level1',
    question: "What letter is this?",
    options: [
      "A",
      "G",
      "H",
      "F"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level1vids/G.mp4',
    correctAnswer: "b. G",
    optionsAreMedia: false
  },
  {
    id: 8,
    level: 'level1',
    question: "Choose the video that shows the correct sign for the letter H:",
    options: [
      "H",
      "D",
      "A",
      "C"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "a. H",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'H': { type: 'video', path: '/assets/level1vids/H.mp4' },
      'D': { type: 'video', path: '/assets/level1vids/D.mp4' },
      'A': { type: 'video', path: '/assets/level1vids/A.mp4' },
      'C': { type: 'video', path: '/assets/level1vids/C.mp4' }
    }
  },
  {
    id: 9,
    level: 'level1',
    question: "What is the letter being shown in the picture?",
    options: [
      "J",
      "D",
      "I",
      "F"
    ],
    mediaType: 'image',
    mediaPath: '/assets/level1pics/I.png',
    correctAnswer: "c. I",
    optionsAreMedia: false
  },
  {
    id: 10,
    level: 'level1',
    question: "What letter is this? It's familiar, right?",
    options: [
      "A",
      "C",
      "E",
      "I"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level1vids/E.mp4',
    correctAnswer: "c. E",
    optionsAreMedia: false
  },
  // Level 2 Questions
  {
    id: 11,
    level: 'level2',
    question: "What sign is being shown in the picture?",
    options: [
      "N",
      "M",
      "A",
      "O"
    ],
    mediaType: 'image',
    mediaPath: '/assets/level2pics/M.jpg',
    correctAnswer: "b. M",
    optionsAreMedia: false
  },
  {
    id: 12,
    level: 'level2',
    question: "Which picture shows the right sign for letter L?",
    options: [
      "M",
      "K",
      "L",
      "O"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "c. L",
    optionsAreMedia: true,
    optionMediaType: 'image',
    optionMediaPaths: {
      'M': { type: 'image', path: '/assets/level2pics/M.jpg' },
      'K': { type: 'image', path: '/assets/level2pics/K.jpg' },
      'L': { type: 'image', path: '/assets/level2pics/L.jpg' },
      'O': { type: 'image', path: '/assets/level2pics/O.jpg' }
    }
  },
  {
    id: 13,
    level: 'level2',
    question: "Which hand shape matches the sign Ñ?",
    options: [
      "B",
      "F",
      "Ñ",
      "Q"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "c. Ñ",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'B': { type: 'video', path: '/assets/level1vids/B.mp4' },
      'F': { type: 'video', path: '/assets/level1vids/F.mp4' },
      'Ñ': { type: 'video', path: '/assets/level2vids/Ñ.mp4' },
      'Q': { type: 'video', path: '/assets/level2vids/Q.mp4' }
    }
  },
  {
    id: 14,
    level: 'level2',
    question: "If you see the sign of the letter \"J\" Which picture matches?",
    options: [
      "J",
      "H",
      "K",
      "L"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "a. J",
    optionsAreMedia: true,
    optionMediaType: 'image',
    optionMediaPaths: {
      'J': { type: 'image', path: '/assets/level2pics/J.jpg' },
      'H': { type: 'image', path: '/assets/level1pics/H.png' },
      'K': { type: 'image', path: '/assets/level2pics/K.jpg' },
      'L': { type: 'image', path: '/assets/level2pics/L.jpg' }
    }
  },
  {
    id: 15,
    level: 'level2',
    question: "What sign is being shown in the picture?",
    options: [
      "K",
      "Q",
      "L",
      "D"
    ],
    mediaType: 'image',
    mediaPath: '/assets/level2pics/Q.jpg',
    correctAnswer: "b. Q",
    optionsAreMedia: false
  },
  {
    id: 16,
    level: 'level2',
    question: "What letter is this?",
    options: [
      "O",
      "Q",
      "P",
      "M"
    ],
    mediaType: 'image',
    mediaPath: '/assets/level2pics/P.jpg',
    correctAnswer: "c. P",
    optionsAreMedia: false
  },
  {
    id: 17,
    level: 'level2',
    question: "Which of these pictures shows the right sign for letter K?",
    options: [
      "O",
      "J",
      "G",
      "K"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "d. K",
    optionsAreMedia: true,
    optionMediaType: 'image',
    optionMediaPaths: {
      'O': { type: 'image', path: '/assets/level2pics/O.jpg' },
      'J': { type: 'image', path: '/assets/level2pics/J.jpg' },
      'G': { type: 'image', path: '/assets/level1pics/G.png' },
      'K': { type: 'image', path: '/assets/level2pics/K.jpg' }
    }
  },
  {
    id: 18,
    level: 'level2',
    question: "What letter is being shown in the picture?",
    options: [
      "K",
      "O",
      "M",
      "A"
    ],
    mediaType: 'image',
    mediaPath: '/assets/level2pics/O.jpg',
    correctAnswer: "b. O",
    optionsAreMedia: false
  },
  {
    id: 19,
    level: 'level2',
    question: "Which video shows the correct sign of NG?",
    options: [
      "O",
      "D",
      "L",
      "NG"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "d. NG",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'O': { type: 'video', path: '/assets/level2vids/O.mp4' },
      'D': { type: 'video', path: '/assets/level1vids/D.mp4' },
      'L': { type: 'video', path: '/assets/level2vids/L.mp4' },
      'NG': { type: 'video', path: '/assets/level2vids/NG.mp4' }
    }
  },
  {
    id: 20,
    level: 'level2',
    question: "Observe the sign of \"N.\" Which picture matches?",
    options: [
      "B",
      "O",
      "N",
      "M"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "N",
    optionsAreMedia: true,
    optionMediaType: 'image',
    optionMediaPaths: {
      'B': { type: 'image', path: '/assets/level1pics/B.png' },
      'O': { type: 'image', path: '/assets/level2pics/O.jpg' },
      'N': { type: 'image', path: '/assets/level2pics/N.jpg' },
      'M': { type: 'image', path: '/assets/level2pics/M.jpg' }
    }
  },
  // Level 3 Questions
  {
    id: 21,
    level: 'level3',
    question: "Find the video with the right sign for letter T.",
    options: [
      "W",
      "U", 
      "T",
      "R"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "c. T",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'W': { type: 'video', path: '/assets/level3vids/W.mp4' },
      'U': { type: 'video', path: '/assets/level3vids/U.mp4' },
      'T': { type: 'video', path: '/assets/level3vids/T.mp4' },
      'R': { type: 'video', path: '/assets/level3vids/R.mp4' }
    }
  },
  {
    id: 22,
    level: 'level3',
    question: "What letter is shown in this video?",
    options: [
      "H",
      "W",
      "N", 
      "A"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level3vids/W.mp4',
    correctAnswer: "b. W",
    optionsAreMedia: false
  },
  {
    id: 23,
    level: 'level3',
    question: "Identify the letter being shown.",
    options: [
      "G",
      "Y",
      "T",
      "U"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level3vids/Y.mp4',
    correctAnswer: "b. Y",
    optionsAreMedia: false
  },
  {
    id: 24,
    level: 'level3',
    question: "Which one shows the sign for letter X?",
    options: [
      "R",
      "X",
      "V",
      "Z"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "b. X",
    optionsAreMedia: true,
    optionMediaType: 'image',
    optionMediaPaths: {
      'R': { type: 'image', path: '/assets/level3pics/R.jpg' },
      'X': { type: 'image', path: '/assets/level3pics/X.jpg' },
      'V': { type: 'image', path: '/assets/level3pics/V.jpg' },
      'Z': { type: 'image', path: '/assets/level3pics/Z.jpg' }
    }
  },
  {
    id: 25,
    level: 'level3',
    question: "What letter is shown in the image?",
    options: [
      "D",
      "H",
      "R",
      "T"
    ],
    mediaType: 'image',
    mediaPath: '/assets/level3pics/R.jpg',
    correctAnswer: "c. R",
    optionsAreMedia: false
  },
  {
    id: 26,
    level: 'level3',
    question: "Can you find the sign for the letter S?",
    options: [
      "S",
      "T",
      "U",
      "V"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "a. S",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'S': { type: 'video', path: '/assets/level3vids/S.mp4' },
      'T': { type: 'video', path: '/assets/level3vids/T.mp4' },
      'U': { type: 'video', path: '/assets/level3vids/U.mp4' },
      'V': { type: 'video', path: '/assets/level3vids/V.mp4' }
    }
  },
  {
    id: 27,
    level: 'level3',
    question: "Tap the video with the sign for letter R.",
    options: [
      "R",
      "S",
      "T",
      "U"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "a. R",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'R': { type: 'video', path: '/assets/level3vids/R.mp4' },
      'S': { type: 'video', path: '/assets/level3vids/S.mp4' },
      'T': { type: 'video', path: '/assets/level3vids/T.mp4' },
      'U': { type: 'video', path: '/assets/level3vids/U.mp4' }
    }
  },
  {
    id: 28,
    level: 'level3',
    question: "What letter is this?",
    options: [
      "Z",
      "Y",
      "X",
      "W"
    ],
    mediaType: 'image',
    mediaPath: '/assets/level3pics/Z.jpg',
    correctAnswer: "a. Z",
    optionsAreMedia: false
  },
  {
    id: 29,
    level: 'level3',
    question: "Which one shows the sign for letter V?",
    options: [
      "Y",
      "X",
      "V",
      "Z"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "c. V",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'Y': { type: 'video', path: '/assets/level3vids/Y.mp4' },
      'X': { type: 'video', path: '/assets/level3vids/X.mp4' },
      'V': { type: 'video', path: '/assets/level3vids/V.mp4' },
      'Z': { type: 'video', path: '/assets/level3vids/Z.mp4' }
    }
  },
  {
    id: 30,
    level: 'level3',
    question: "Identify the letter being shown.",
    options: [
      "D",
      "K",
      "P",
      "U"
    ],
    mediaType: 'image',
    mediaPath: '/assets/level3pics/U.jpg',
    correctAnswer: "d. U",
    optionsAreMedia: false
  },
  // Level 4 Questions (Numbers)
  {
    id: 31,
    level: 'level4',
    question: "What word is being signed?",
    options: [
      "2",
      "4", 
      "5",
      "3"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level4vids/3.mp4',
    correctAnswer: "d. 3",
    optionsAreMedia: false
  },
  {
    id: 32,
    level: 'level4',
    question: "What word is this sign?",
    options: [
      "7",
      "8",
      "6",
      "1"
    ],
    mediaType: 'image',
    mediaPath: '/assets/level4pics/6.jpg',
    correctAnswer: "c. 6",
    optionsAreMedia: false
  },
  {
    id: 33,
    level: 'level4',
    question: "Find the correct video for number 10",
    options: [
      "10",
      "2",
      "5",
      "3"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "a. 10",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      '10': { type: 'video', path: '/assets/level4vids/10.mp4' },
      '2': { type: 'video', path: '/assets/level4vids/2.mp4' },
      '5': { type: 'video', path: '/assets/level4vids/5.mp4' },
      '3': { type: 'video', path: '/assets/level4vids/3.mp4' }
    }
  },
  {
    id: 34,
    level: 'level4',
    question: "Which number is right for this sign?",
    options: [
      "7",
      "2",
      "3",
      "1"
    ],
    mediaType: 'image',
    mediaPath: '/assets/level4pics/2.jpg',
    correctAnswer: "b. 2",
    optionsAreMedia: false
  },
  {
    id: 35,
    level: 'level4',
    question: "Choose the video with the sign for '5'.",
    options: [
      "10",
      "6",
      "5",
      "3"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "c. 5",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      '10': { type: 'video', path: '/assets/level4vids/10.mp4' },
      '6': { type: 'video', path: '/assets/level4vids/6.mp4' },
      '5': { type: 'video', path: '/assets/level4vids/5.mp4' },
      '3': { type: 'video', path: '/assets/level4vids/3.mp4' }
    }
  },
  {
    id: 36,
    level: 'level4',
    question: "What does this sign mean?",
    options: [
      "3",
      "10",
      "9",
      "1"
    ],
    mediaType: 'image',
    mediaPath: '/assets/level4pics/1.jpg',
    correctAnswer: "d. 1",
    optionsAreMedia: false
  },
  {
    id: 37,
    level: 'level4',
    question: "Which picture shows the sign for '4'?",
    options: [
      "4",
      "9",
      "8",
      "3"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "a. 4",
    optionsAreMedia: true,
    optionMediaType: 'image',
    optionMediaPaths: {
      '4': { type: 'image', path: '/assets/level4pics/4.jpg' },
      '9': { type: 'image', path: '/assets/level4pics/9.jpg' },
      '8': { type: 'image', path: '/assets/level4pics/8.jpg' },
      '3': { type: 'image', path: '/assets/level4pics/3.jpg' }
    }
  },
  {
    id: 38,
    level: 'level4',
    question: "Which number is right for this sign?",
    options: [
      "4",
      "10",
      "8",
      "9"
    ],
    mediaType: 'image',
    mediaPath: '/assets/level4pics/9.jpg',
    correctAnswer: "d. 9",
    optionsAreMedia: false
  },
  {
    id: 39,
    level: 'level4',
    question: "Which video signs the number 7?",
    options: [
      "2",
      "7",
      "8",
      "1"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "b. 7",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      '2': { type: 'video', path: '/assets/level4vids/2.mp4' },
      '7': { type: 'video', path: '/assets/level4vids/7.mp4' },
      '8': { type: 'video', path: '/assets/level4vids/8.mp4' },
      '1': { type: 'video', path: '/assets/level4vids/1.mp4' }
    }
  },
  {
    id: 40,
    level: 'level4',
    question: "Select the picture showing the sign for number 8.",
    options: [
      "3",
      "7",
      "8",
      "9"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "c. 8",
    optionsAreMedia: true,
    optionMediaType: 'image',
    optionMediaPaths: {
      '3': { type: 'image', path: '/assets/level4pics/3.jpg' },
      '7': { type: 'image', path: '/assets/level4pics/7.jpg' },
      '8': { type: 'image', path: '/assets/level4pics/8.jpg' },
      '9': { type: 'image', path: '/assets/level4pics/9.jpg' }
    }
  },
  // Level 5 Questions (Numbers 11-20)
  {
    id: 41,
    level: 'level5',
    question: "Identify the number being shown.",
    options: [
      "11",
      "12",
      "13",
      "14"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level5vids/12.mp4',
    correctAnswer: "b. 12",
    optionsAreMedia: false
  },
  {
    id: 42,
    level: 'level5',
    question: "Can you find the sign for number 15?",
    options: [
      "12",
      "13",
      "14",
      "15"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "d. 15",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      '12': { type: 'video', path: '/assets/level5vids/12.mp4' },
      '13': { type: 'video', path: '/assets/level5vids/13.mp4' },
      '14': { type: 'video', path: '/assets/level5vids/14.mp4' },
      '15': { type: 'video', path: '/assets/level5vids/15.mp4' }
    }
  },
  {
    id: 43,
    level: 'level5',
    question: "Which one shows the sign for the number 11?",
    options: [
      "11",
      "12",
      "13",
      "14"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "a. 11",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      '11': { type: 'video', path: '/assets/level5vids/11.mp4' },
      '12': { type: 'video', path: '/assets/level5vids/12.mp4' },
      '13': { type: 'video', path: '/assets/level5vids/13.mp4' },
      '14': { type: 'video', path: '/assets/level5vids/14.mp4' }
    }
  },
  {
    id: 44,
    level: 'level5',
    question: "What number is this?",
    options: [
      "16",
      "17",
      "18",
      "19"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level5vids/17.mp4',
    correctAnswer: "b. 17",
    optionsAreMedia: false
  },
  {
    id: 45,
    level: 'level5',
    question: "What number is shown in the video?",
    options: [
      "14",
      "17",
      "20",
      "11"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level5vids/20.mp4',
    correctAnswer: "c. 20",
    optionsAreMedia: false
  },
  {
    id: 46,
    level: 'level5',
    question: "Find the video with the right sign for the number 13.",
    options: [
      "11",
      "13",
      "19",
      "18"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "b. 13",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      '11': { type: 'video', path: '/assets/level5vids/11.mp4' },
      '13': { type: 'video', path: '/assets/level5vids/13.mp4' },
      '19': { type: 'video', path: '/assets/level5vids/19.mp4' },
      '18': { type: 'video', path: '/assets/level5vids/18.mp4' }
    }
  },
  {
    id: 47,
    level: 'level5',
    question: "Identify the number being shown.",
    options: [
      "16",
      "12",
      "13",
      "19"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level5vids/19.mp4',
    correctAnswer: "d. 19",
    optionsAreMedia: false
  },
  {
    id: 48,
    level: 'level5',
    question: "Tap the video with the sign for the number 14.",
    options: [
      "14",
      "15",
      "16",
      "17"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "a. 14",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      '14': { type: 'video', path: '/assets/level5vids/14.mp4' },
      '15': { type: 'video', path: '/assets/level5vids/15.mp4' },
      '16': { type: 'video', path: '/assets/level5vids/16.mp4' },
      '17': { type: 'video', path: '/assets/level5vids/17.mp4' }
    }
  },
  {
    id: 49,
    level: 'level5',
    question: "What number is shown in the video?",
    options: [
      "14",
      "15",
      "16",
      "17"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level5vids/16.mp4',
    correctAnswer: "c. 16",
    optionsAreMedia: false
  },
  {
    id: 50,
    level: 'level5',
    question: "What number is this?",
    options: [
      "13",
      "18",
      "20",
      "15"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level5vids/18.mp4',
    correctAnswer: "b. 18",
    optionsAreMedia: false
  }
];

const QuizComponent: React.FC<QuizComponentProps> = ({ onClose, level = 1 }) => {
  const history = useHistory();
  const params = useParams<{ categoryId?: string }>();
  const levelQuestions = quizQuestions.filter(q => q.level === `level${level}`);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10); 
  const videoRefs = React.useRef<{[key: string]: HTMLVideoElement | null}>({});

  const moveToNextQuestion = useCallback(() => {
    setIsAnswered(false);
    setSelectedAnswer(null);
    setTimeLeft(10); 

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < levelQuestions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  }, [currentQuestion, levelQuestions.length]);

  const handleAnswerClick = useCallback((selectedOption: string) => {
    if (isAnswered) return; 

    setIsAnswered(true);
    setSelectedAnswer(selectedOption);

    if (selectedOption === levelQuestions[currentQuestion].correctAnswer) {
      setScore(prevScore => prevScore + 1);
    }

    const optionText = selectedOption.split('.')[1]?.trim() || '';
    if (videoRefs.current[optionText]) {
      const video = videoRefs.current[optionText];
      video.muted = false;
      video.load();
      setTimeout(() => {
        video.play().catch(err => console.error("Error playing video after answer:", err));
      }, 100);
    }
  }, [isAnswered, currentQuestion, levelQuestions]);

  useEffect(() => {
    if (showScore || isAnswered) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setIsAnswered(true);
          setSelectedAnswer("TIME_EXPIRED");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [currentQuestion, isAnswered, showScore]);

  const setVideoRef = useCallback((element: HTMLVideoElement | null, optionText: string) => {
    if (element) {
      videoRefs.current[optionText] = element;
    }
  }, []);

  useEffect(() => {
    const playAllVideos = () => {
      const questionData = levelQuestions[currentQuestion];
      if (questionData?.optionsAreMedia && questionData.optionMediaType === 'video') {
        const videoElements = document.querySelectorAll('video.option-media');
        
        videoElements.forEach(video => {
          if (video instanceof HTMLVideoElement) {            video.muted = true;
            video.setAttribute('playsinline', '');
            video.setAttribute('webkit-playsinline', '');
            video.removeAttribute('controls');
            video.controls = false;
            video.style.width = '100%';
            video.style.height = '100%';
            video.style.objectFit = 'contain';
            video.loop = true;
            
            const attemptPlay = () => {
              const playPromise = video.play();
              if (playPromise !== undefined) {
                playPromise.catch(() => {
                  setTimeout(() => {
                    video.muted = true;
                    video.play().catch(() => {});
                  }, 100);
                });
              }
            };
            attemptPlay();
          }
        });
      }
    };
    
    Object.values(videoRefs.current).forEach(video => {
      if (video) {
        video.pause();
        video.currentTime = 0;
        video.muted = true;
        video.loop = true;
      }
    });
    
    setTimeout(playAllVideos, 100);
    setTimeout(playAllVideos, 500);
    setTimeout(playAllVideos, 1000);
    
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        playAllVideos();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', playAllVideos);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', playAllVideos);
    };
  }, [currentQuestion, levelQuestions]);

return (
   <div className="quiz-container">
      {!showScore ? (
        <>          
          <div className="quiz-header">
            <div className="timer-container">
              <div className="question-indicator">
                <div className="question-number">
                  {currentQuestion + 1}
                </div>
              </div>
              <div className="countdown-timer">
                <div className={`timer-box ${timeLeft <= 3 ? 'critical' : timeLeft <= 5 ? 'warning' : ''}`}>
                  <span>{timeLeft}</span>
                </div>
              </div>
              <div className="right-spacer"></div>
            </div>
          </div>
 <IonCard className="question-card">
     <IonCardHeader>
      <IonCardTitle>{levelQuestions[currentQuestion]?.question}</IonCardTitle>
         </IonCardHeader>
            <IonCardContent>
              {levelQuestions[currentQuestion]?.showQuestionMedia !== false && levelQuestions[currentQuestion]?.mediaType !== 'none' && (
                <div className="main-media-container">
                  {levelQuestions[currentQuestion].mediaType === 'video' && 
                   levelQuestions[currentQuestion].mediaPath && (
                     <video 
                      src={levelQuestions[currentQuestion].mediaPath}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="quiz-media"
                      onError={(e) => console.error("Video error:", e)}
                    ></video>
                  )}
                  {levelQuestions[currentQuestion].mediaType === 'image' && 
                   levelQuestions[currentQuestion].mediaPath && (
                    <img 
                      src={levelQuestions[currentQuestion].mediaPath}
                      alt="Quiz visual"
                      className="quiz-media"
                      onError={(e) => console.error("Image error:", e)}
                    />
                  )}
                </div>
              )}
              <div className="options-list">
                {levelQuestions[currentQuestion]?.options.map((option, index) => {
                  const questionData = levelQuestions[currentQuestion];
                  const optionLetter = String.fromCharCode(97 + index); // 'a', 'b', 'c', 'd'
                  const optionText = option.trim();
                  const optionMediaInfo = questionData.optionMediaPaths?.[optionText];
                  const levelFolder = questionData.level;
                  
                  return (
                    <IonItem 
                      key={index}
                      lines="none"
                      button
                      detail={false}
                      onClick={() => handleAnswerClick(`${optionLetter}. ${optionText}`)}
                      disabled={isAnswered}
                      className={`option-item ${isAnswered && `${optionLetter}. ${optionText}` === levelQuestions[currentQuestion].correctAnswer ? 'correct-answer' : ''}`}
                    >
                      <div className="option-content">
                        {questionData.optionsAreMedia ? (
                          <div className="option-media-container">
                            {optionMediaInfo ? (
                              optionMediaInfo.type === 'video' ? (
                                <video 
                                  ref={(el) => setVideoRef(el, optionText)}
                                  src={optionMediaInfo.path}
                                  className="option-media" 
                                  loop
                                  muted={true}
                                  playsInline
                                  webkit-playsinline="true"
                                  preload="auto"
                                  autoPlay={true}
                                  controls={false}
                                  onLoadedData={(e) => {
                                    const video = e.target as HTMLVideoElement;
                                    video.muted = true;
                                    video.controls = false;
                                    video.play().catch(() => {});
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (!isAnswered) {
                                      handleAnswerClick(`${optionLetter}. ${optionText}`);
                                    }
                                  }}
                                ></video>
                              ) : (
                                <img 
                                  src={optionMediaInfo.path}
                                  alt={`Option ${optionLetter}`}
                                  className="option-media"
                                  onError={(e) => console.error("Option image error:", e)}
                                />
                              )
                            ) : (
                              questionData.optionMediaType === 'video' || 
                              (questionData.optionMediaType !== 'image' && questionData.mediaType === 'video') ? (
                                <video 
                                  ref={(el) => setVideoRef(el, optionText)}
                                  src={`/assets/${levelFolder}vids/${optionText}.mp4`}
                                  className="option-media"
                                  loop
                                  muted={true}
                                  playsInline
                                  webkit-playsinline="true"
                                  preload="auto"
                                  autoPlay={true}
                                  controls={false}
                                  onLoadedData={(e) => {
                                    const video = e.target as HTMLVideoElement;
                                    video.muted = true;
                                    video.controls = false;
                                    video.play().catch(() => {});
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (!isAnswered) {
                                      handleAnswerClick(`${optionLetter}. ${optionText}`);
                                    }
                                  }}
                                ></video>
                              ) : (
                                <img 
                                  src={`/assets/${levelFolder}pics/${optionText}.jpg`}
                                  alt={`Option ${optionLetter}`}
                                  className="option-media"
                                  onError={(e) => console.error("Option image error:", e)}
                                />
                              )
                            )}
                          </div>
                        ) : (
                          <span className="option-text">{optionText}</span>
                        )}
                      </div>
                    </IonItem>
                  );
                })}
              </div>
              
          {isAnswered && ( 
                <>
                  {selectedAnswer === "TIME_EXPIRED" && (
                    <div className="time-expired-message">
                      Time expired! Please proceed to the next question.
                    </div>
                  )}
                  <div className="next-question-container">
                    <IonButton expand="block" onClick={moveToNextQuestion} className="next-question-button">
                      Next Question
                    </IonButton>
                  </div>
                </>
              )}
            </IonCardContent>
          </IonCard>
        </>
      ) : (
        <IonCard className="score-card">
          <IonCardHeader>
            <IonCardTitle>Quiz Completed!</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>            <div className="score-content">
              <h2>Your score: {score} out of {levelQuestions.length}</h2>
              <p>{score >= 7 ? 'Great job!' : 'Keep practicing!'}</p>
              <div className="back-button-container">
                <IonButton 
                  expand="block" 
                  onClick={() => {
                    onClose();
                    const categoryId = params.categoryId || 'alphabet';
                    const nextLevel = level + 1;
                    
                    if (nextLevel <= 5) {
                      history.push(`/category/${categoryId}/level/${nextLevel}`);
                    } else {
                      history.push(`/category/${categoryId}`);
                    }
                  }}
                  className="back-button"
                  size="large"
                >
                  {level < 5 ? 'Continue Next Level' : 'Back to Levels'}
                </IonButton>
              </div>
            </div>
          </IonCardContent>
        </IonCard>
      )}
    </div>
  );
};

export default QuizComponent;


