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
  },
  // Level 6 Questions (Colors)
  {
    id: 51,
    level: 'level6',
    question: "Which word is right for this sign?",
    options: [
      "red",
      "blue",
      "yellow",
      "orange"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level6vids/blue.mp4',
    correctAnswer: "b. blue",
    optionsAreMedia: false
  },
  {
    id: 52,
    level: 'level6',
    question: "What color is this?",
    options: [
      "black",
      "white",
      "red",
      "orange"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level6vids/red.mp4',
    correctAnswer: "c. red",
    optionsAreMedia: false
  },
  {
    id: 53,
    level: 'level6',
    question: "Which one shows the sign for the color orange?",
    options: [
      "orange",
      "violet",
      "blue",
      "black"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "a. orange",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'orange': { type: 'video', path: '/assets/level6vids/orange.mp4' },
      'violet': { type: 'video', path: '/assets/level6vids/violet.mp4' },
      'blue': { type: 'video', path: '/assets/level6vids/blue.mp4' },
      'black': { type: 'video', path: '/assets/level6vids/black.mp4' }
    }
  },
  {
    id: 54,
    level: 'level6',
    question: "Can you find the sign for the color violet?",
    options: [
      "red",
      "violet",
      "white",
      "pink"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "b. violet",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'red': { type: 'video', path: '/assets/level6vids/red.mp4' },
      'violet': { type: 'video', path: '/assets/level6vids/violet.mp4' },
      'white': { type: 'video', path: '/assets/level6vids/white.mp4' },
      'pink': { type: 'video', path: '/assets/level6vids/pink.mp4' }
    }
  },
  {
    id: 55,
    level: 'level6',
    question: "Identify the color being shown.",
    options: [
      "pink",
      "green",
      "violet",
      "yellow"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level6vids/green.mp4',
    correctAnswer: "b. green",
    optionsAreMedia: false
  },
  {
    id: 56,
    level: 'level6',
    question: "What color is this?",
    options: [
      "brown",
      "pink",
      "yellow",
      "red"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level6vids/pink.mp4',
    correctAnswer: "b. pink",
    optionsAreMedia: false
  },
  {
    id: 57,
    level: 'level6',
    question: "Tap the video with the sign for the color yellow.",
    options: [
      "brown",
      "yellow",
      "black",
      "white"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "b. yellow",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'brown': { type: 'video', path: '/assets/level6vids/brown.mp4' },
      'yellow': { type: 'video', path: '/assets/level6vids/yellow.mp4' },
      'black': { type: 'video', path: '/assets/level6vids/black.mp4' },
      'white': { type: 'video', path: '/assets/level6vids/white.mp4' }
    }
  },
  {
    id: 58,
    level: 'level6',
    question: "Which video shows the correct sign for the color white?",
    options: [
      "black",
      "brown",
      "orange",
      "white"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "d. white",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'black': { type: 'video', path: '/assets/level6vids/black.mp4' },
      'brown': { type: 'video', path: '/assets/level6vids/brown.mp4' },
      'orange': { type: 'video', path: '/assets/level6vids/orange.mp4' },
      'white': { type: 'video', path: '/assets/level6vids/white.mp4' }
    }
  },
  {
    id: 59,
    level: 'level6',
    question: "Identify the color being shown.",
    options: [
      "black",
      "yellow",
      "brown",
      "blue"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level6vids/brown.mp4',
    correctAnswer: "c. brown",
    optionsAreMedia: false
  },
  {
    id: 60,
    level: 'level6',
    question: "Identify the color being shown.",
    options: [
      "white",
      "red",
      "violet",
      "black"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level6vids/black.mp4',
    correctAnswer: "d. black",
    optionsAreMedia: false
  },
  // Level 7 Questions (Animals)
  {
    id: 61,
    level: 'level7',
    question: "Can you find the sign for the word pig?",
    options: [
      "dog",
      "cat",
      "pig",
      "chicken"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "c. pig",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'dog': { type: 'video', path: '/assets/level7vids/dog.mp4' },
      'cat': { type: 'video', path: '/assets/level7vids/cat.mp4' },
      'pig': { type: 'video', path: '/assets/level7vids/pig.mp4' },
      'chicken': { type: 'video', path: '/assets/level7vids/chicken.mp4' }
    }
  },
  {
    id: 62,
    level: 'level7',
    question: "What is the correct sign of the word Cow?",
    options: [
      "cat",
      "cow",
      "goat",
      "duck"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "b. cow",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'cat': { type: 'video', path: '/assets/level7vids/cat.mp4' },
      'cow': { type: 'video', path: '/assets/level7vids/cow.mp4' },
      'goat': { type: 'video', path: '/assets/level7vids/goat.mp4' },
      'duck': { type: 'video', path: '/assets/level7vids/duck.mp4' }
    }
  },
  {
    id: 63,
    level: 'level7',
    question: "Which one shows the sign for the word Horse?",
    options: [
      "duck",
      "horse",
      "goat",
      "bird"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "b. horse",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'duck': { type: 'video', path: '/assets/level7vids/duck.mp4' },
      'horse': { type: 'video', path: '/assets/level7vids/horse.mp4' },
      'goat': { type: 'video', path: '/assets/level7vids/goat.mp4' },
      'bird': { type: 'video', path: '/assets/level7vids/bird.mp4' }
    }
  },
  {
    id: 64,
    level: 'level7',
    question: "Tap the video with the sign for Dog.",
    options: [
      "cow",
      "cat",
      "dog",
      "fish"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "c. dog",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'cow': { type: 'video', path: '/assets/level7vids/cow.mp4' },
      'cat': { type: 'video', path: '/assets/level7vids/cat.mp4' },
      'dog': { type: 'video', path: '/assets/level7vids/dog.mp4' },
      'fish': { type: 'video', path: '/assets/level7vids/fish.mp4' }
    }
  },
  {
    id: 65,
    level: 'level7',
    question: "What does this sign mean?",
    options: [
      "chicken",
      "cat",
      "dog",
      "bird"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level7vids/chicken.mp4',
    correctAnswer: "a. chicken",
    optionsAreMedia: false
  },
  {
    id: 66,
    level: 'level7',
    question: "Find the video with the right sign for this picture.",
    options: [
      "cat",
      "bird",
      "cow",
      "duck"
    ],
    mediaType: 'image',
    mediaPath: '/assets/level7pics/cat.jpg',
    correctAnswer: "a. cat",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'cat': { type: 'video', path: '/assets/level7vids/cat.mp4' },
      'bird': { type: 'video', path: '/assets/level7vids/bird.mp4' },
      'cow': { type: 'video', path: '/assets/level7vids/cow.mp4' },
      'duck': { type: 'video', path: '/assets/level7vids/duck.mp4' }
    }
  },
  {
    id: 67,
    level: 'level7',
    question: "What animal is being shown in the video?",
    options: [
      "cow",
      "fish",
      "dog",
      "bird"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level7vids/bird.mp4',
    correctAnswer: "d. bird",
    optionsAreMedia: false
  },
  {
    id: 68,
    level: 'level7',
    question: "Which one shows the sign for Duck?",
    options: [
      "horse",
      "duck",
      "goat",
      "bird"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "b. duck",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'horse': { type: 'video', path: '/assets/level7vids/horse.mp4' },
      'duck': { type: 'video', path: '/assets/level7vids/duck.mp4' },
      'goat': { type: 'video', path: '/assets/level7vids/goat.mp4' },
      'bird': { type: 'video', path: '/assets/level7vids/bird.mp4' }
    }
  },
  {
    id: 69,
    level: 'level7',
    question: "Which of the following video shows the correct sign for the word \"Fish\"?",
    options: [
      "fish",
      "dog",
      "chicken",
      "cat"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "a. fish",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'fish': { type: 'video', path: '/assets/level7vids/fish.mp4' },
      'dog': { type: 'video', path: '/assets/level7vids/dog.mp4' },
      'chicken': { type: 'video', path: '/assets/level7vids/chicken.mp4' },
      'cat': { type: 'video', path: '/assets/level7vids/cat.mp4' }
    }
  },
  {
    id: 70,
    level: 'level7',
    question: "Identify the sign is being shown in the video.",
    options: [
      "fish",
      "cow",
      "goat",
      "bird"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level7vids/goat.mp4',
    correctAnswer: "c. goat",
    optionsAreMedia: false
  },
  // Level 8 Questions (Pronouns)
  {
    id: 71,
    level: 'level8',
    question: "What word is this sign?",
    options: [
      "They",
      "Us",
      "Them",
      "Her"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level8vids/them.mp4',
    correctAnswer: "c. Them",
    optionsAreMedia: false
  },
  {
    id: 72,
    level: 'level8',
    question: "Tap the video with the sign for 'I'.",
    options: [
      "Me",
      "I",
      "They",
      "Us"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "b. I",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'Me': { type: 'video', path: '/assets/level8vids/me.mp4' },
      'I': { type: 'video', path: '/assets/level8vids/i.mp4' },
      'They': { type: 'video', path: '/assets/level8vids/they.mp4' },
      'Us': { type: 'video', path: '/assets/level8vids/us.mp4' }
    }
  },
  {
    id: 73,
    level: 'level8',
    question: "Which word is being signed?",
    options: [
      "They",
      "Them",
      "You",
      "Us"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level8vids/you.mp4',
    correctAnswer: "c. You",
    optionsAreMedia: false
  },
  {
    id: 74,
    level: 'level8',
    question: "What video shows the sign for 'Her'?",
    options: [
      "Her",
      "Him",
      "Me",
      "You"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "a. Her",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'Her': { type: 'video', path: '/assets/level8vids/her.mp4' },
      'Him': { type: 'video', path: '/assets/level8vids/him.mp4' },
      'Me': { type: 'video', path: '/assets/level8vids/me.mp4' },
      'You': { type: 'video', path: '/assets/level8vids/you.mp4' }
    }
  },
  {
    id: 75,
    level: 'level8',
    question: "Choose the correct signing for 'Him'.",
    options: [
      "Her",
      "Him",
      "She",
      "He"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "b. Him",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'Her': { type: 'video', path: '/assets/level8vids/her.mp4' },
      'Him': { type: 'video', path: '/assets/level8vids/him.mp4' },
      'She': { type: 'video', path: '/assets/level8vids/she.mp4' },
      'He': { type: 'video', path: '/assets/level8vids/he.mp4' }
    }
  },
  {
    id: 76,
    level: 'level8',
    question: "Choose the word for this sign.",
    options: [
      "Them",
      "Us",
      "They",
      "Him"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level8vids/they.mp4',
    correctAnswer: "c. They",
    optionsAreMedia: false
  },
  {
    id: 77,
    level: 'level8',
    question: "Which word is right for this sign?",
    options: [
      "Us",
      "She",
      "I",
      "You"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level8vids/us.mp4',
    correctAnswer: "a. Us",
    optionsAreMedia: false
  },
  {
    id: 78,
    level: 'level8',
    question: "Tap the video that signs the word 'She'.",
    options: [
      "He",
      "Him",
      "She",
      "You"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "c. She",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'He': { type: 'video', path: '/assets/level8vids/he.mp4' },
      'Him': { type: 'video', path: '/assets/level8vids/him.mp4' },
      'She': { type: 'video', path: '/assets/level8vids/she.mp4' },
      'You': { type: 'video', path: '/assets/level8vids/you.mp4' }
    }
  },
  {
    id: 79,
    level: 'level8',
    question: "Which one shows the sign for 'Me'?",
    options: [
      "He",
      "Me",
      "You",
      "Us"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "b. Me",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'He': { type: 'video', path: '/assets/level8vids/he.mp4' },
      'Me': { type: 'video', path: '/assets/level8vids/me.mp4' },
      'You': { type: 'video', path: '/assets/level8vids/you.mp4' },
      'Us': { type: 'video', path: '/assets/level8vids/us.mp4' }
    }
  },
  {
    id: 80,
    level: 'level8',
    question: "What word is this sign?",
    options: [
      "He",
      "She",
      "Me",
      "Them"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level8vids/he.mp4',
    correctAnswer: "a. He",
    optionsAreMedia: false
  },
  // Level 9 Questions (Days/Time)
  {
    id: 81,
    level: 'level9',
    question: "Can you find the sign for the word \"Monday\"?",
    options: [
      "Tuesday",
      "Monday",
      "Thursday",
      "Wednesday"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "b. Monday",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'Tuesday': { type: 'video', path: '/assets/level9vids/tuesday.mp4' },
      'Monday': { type: 'video', path: '/assets/level9vids/monday.mp4' },
      'Thursday': { type: 'video', path: '/assets/level9vids/thursday.mp4' },
      'Wednesday': { type: 'video', path: '/assets/level9vids/wednesday.mp4' }
    }
  },
  {
    id: 82,
    level: 'level9',
    question: "What sign is being shown in the video?",
    options: [
      "Wednesday",
      "Monday",
      "Friday",
      "Thursday"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level9vids/wednesday.mp4',
    correctAnswer: "a. Wednesday",
    optionsAreMedia: false
  },
  {
    id: 83,
    level: 'level9',
    question: "Which one shows the sign for Thursday?",
    options: [
      "Friday",
      "Sunday",
      "Saturday",
      "Thursday"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "d. Thursday",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'Friday': { type: 'video', path: '/assets/level9vids/friday.mp4' },
      'Sunday': { type: 'video', path: '/assets/level9vids/sunday.mp4' },
      'Saturday': { type: 'video', path: '/assets/level9vids/saturday.mp4' },
      'Thursday': { type: 'video', path: '/assets/level9vids/thursday.mp4' }
    }
  },
  {
    id: 84,
    level: 'level9',
    question: "What is the correct sign of the word Months?",
    options: [
      "Days",
      "Years",
      "Months",
      "Weeks"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "c. Months",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'Days': { type: 'video', path: '/assets/level9vids/days.mp4' },
      'Years': { type: 'video', path: '/assets/level9vids/years.mp4' },
      'Months': { type: 'video', path: '/assets/level9vids/months.mp4' },
      'Weeks': { type: 'video', path: '/assets/level9vids/weeks.mp4' }
    }
  },
  {
    id: 85,
    level: 'level9',
    question: "Which of the following video shows the correct sign for the word \"Tuesday\"?",
    options: [
      "Monday",
      "Wednesday",
      "Tuesday",
      "Thursday"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "c. Tuesday",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'Monday': { type: 'video', path: '/assets/level9vids/monday.mp4' },
      'Wednesday': { type: 'video', path: '/assets/level9vids/wednesday.mp4' },
      'Tuesday': { type: 'video', path: '/assets/level9vids/tuesday.mp4' },
      'Thursday': { type: 'video', path: '/assets/level9vids/thursday.mp4' }
    }
  },
  {
    id: 86,
    level: 'level9',
    question: "Identify the sign is being shown in the video.",
    options: [
      "Tuesday",
      "Friday",
      "Wednesday",
      "Saturday"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level9vids/friday.mp4',
    correctAnswer: "b. Friday",
    optionsAreMedia: false
  },
  {
    id: 87,
    level: 'level9',
    question: "What word is this sign?",
    options: [
      "Sunday",
      "Tuesday",
      "Monday",
      "Friday"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level9vids/sunday.mp4',
    correctAnswer: "a. Sunday",
    optionsAreMedia: false
  },
  {
    id: 88,
    level: 'level9',
    question: "Which video shows the right sign for the word Saturday?",
    options: [
      "Sunday",
      "Wednesday",
      "Saturday",
      "Thursday"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "c. Saturday",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'Sunday': { type: 'video', path: '/assets/level9vids/sunday.mp4' },
      'Wednesday': { type: 'video', path: '/assets/level9vids/wednesday.mp4' },
      'Saturday': { type: 'video', path: '/assets/level9vids/saturday.mp4' },
      'Thursday': { type: 'video', path: '/assets/level9vids/thursday.mp4' }
    }
  },
  {
    id: 89,
    level: 'level9',
    question: "Identify the sign is being shown in the video.",
    options: [
      "Days",
      "Years",
      "Months",
      "Weeks"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level9vids/weeks.mp4',
    correctAnswer: "d. Weeks",
    optionsAreMedia: false
  },
  {
    id: 90,
    level: 'level9',
    question: "What does this sign mean?",
    options: [
      "Months",
      "Years",
      "Days",
      "Weeks"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level9vids/days.mp4',
    correctAnswer: "c. Days",
    optionsAreMedia: false
  },
  // Level 10 Questions (Months)
  {
    id: 91,
    level: 'level10',
    question: "Tap the video with the sign for March.",
    options: [
      "February",
      "January",
      "March",
      "April"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "c. March",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'February': { type: 'video', path: '/assets/level10vids/february.mp4' },
      'January': { type: 'video', path: '/assets/level10vids/january.mp4' },
      'March': { type: 'video', path: '/assets/level10vids/march.mp4' },
      'April': { type: 'video', path: '/assets/level10vids/april.mp4' }
    }
  },
  {
    id: 92,
    level: 'level10',
    question: "What is the correct sign for January?",
    options: [
      "June",
      "May",
      "July",
      "January"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "d. January",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'June': { type: 'video', path: '/assets/level10vids/june.mp4' },
      'May': { type: 'video', path: '/assets/level10vids/may.mp4' },
      'July': { type: 'video', path: '/assets/level10vids/july.mp4' },
      'January': { type: 'video', path: '/assets/level10vids/january.mp4' }
    }
  },
  {
    id: 93,
    level: 'level10',
    question: "What month is being shown in the video?",
    options: [
      "January",
      "February",
      "March",
      "April"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level10vids/february.mp4',
    correctAnswer: "b. February",
    optionsAreMedia: false
  },
  {
    id: 94,
    level: 'level10',
    question: "Which of the following is the correct sign for May?",
    options: [
      "May",
      "June",
      "July",
      "August"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "a. May",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'May': { type: 'video', path: '/assets/level10vids/may.mp4' },
      'June': { type: 'video', path: '/assets/level10vids/june.mp4' },
      'July': { type: 'video', path: '/assets/level10vids/july.mp4' },
      'August': { type: 'video', path: '/assets/level10vids/august.mp4' }
    }
  },
  {
    id: 95,
    level: 'level10',
    question: "Which word is right for this sign?",
    options: [
      "December",
      "April",
      "November",
      "June"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level10vids/april.mp4',
    correctAnswer: "b. April",
    optionsAreMedia: false
  },
  {
    id: 96,
    level: 'level10',
    question: "What month is this?",
    options: [
      "August",
      "June",
      "July",
      "October"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level10vids/july.mp4',
    correctAnswer: "c. July",
    optionsAreMedia: false
  },
  {
    id: 97,
    level: 'level10',
    question: "Can you find the sign for the month \"September\"?",
    options: [
      "October",
      "June",
      "August",
      "September"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "d. September",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'October': { type: 'video', path: '/assets/level10vids/october.mp4' },
      'June': { type: 'video', path: '/assets/level10vids/june.mp4' },
      'August': { type: 'video', path: '/assets/level10vids/august.mp4' },
      'September': { type: 'video', path: '/assets/level10vids/september.mp4' }
    }
  },
  {
    id: 98,
    level: 'level10',
    question: "Tap the video with the sign for August.",
    options: [
      "October",
      "June",
      "August",
      "September"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "c. August",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'October': { type: 'video', path: '/assets/level10vids/october.mp4' },
      'June': { type: 'video', path: '/assets/level10vids/june.mp4' },
      'August': { type: 'video', path: '/assets/level10vids/august.mp4' },
      'September': { type: 'video', path: '/assets/level10vids/september.mp4' }
    }
  },
  {
    id: 99,
    level: 'level10',
    question: "Which video shows the right sign of November?",
    options: [
      "October",
      "November",
      "December",
      "September"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "b. November",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'October': { type: 'video', path: '/assets/level10vids/october.mp4' },
      'November': { type: 'video', path: '/assets/level10vids/november.mp4' },
      'December': { type: 'video', path: '/assets/level10vids/december.mp4' },
      'September': { type: 'video', path: '/assets/level10vids/september.mp4' }
    }
  },
  {
    id: 100,
    level: 'level10',
    question: "Find the video with the right sign for October.",
    options: [
      "October",
      "November",
      "December",
      "September"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "a. October",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'October': { type: 'video', path: '/assets/level10vids/october.mp4' },
      'November': { type: 'video', path: '/assets/level10vids/november.mp4' },
      'December': { type: 'video', path: '/assets/level10vids/december.mp4' },
      'September': { type: 'video', path: '/assets/level10vids/september.mp4' }
    }
  },
  // Level 11 Questions (Places/Community)
  {
    id: 101,
    level: 'level11',
    question: "Tap the video with the sign for this picture.",
    options: [
      "clinic",
      "hospital",
      "church",
      "park"
    ],
    mediaType: 'image',
    mediaPath: '/assets/level11pics/hospital.jpg',
    correctAnswer: "b. hospital",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'clinic': { type: 'video', path: '/assets/level11vids/clinic.mp4' },
      'hospital': { type: 'video', path: '/assets/level11vids/hospital.mp4' },
      'church': { type: 'video', path: '/assets/level11vids/church.mp4' },
      'park': { type: 'video', path: '/assets/level11vids/park.mp4' }
    }
  },
  {
    id: 102,
    level: 'level11',
    question: "Which is the correct sign for the community?",
    options: [
      "community",
      "school",
      "park",
      "house"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "a. community",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'community': { type: 'video', path: '/assets/level11vids/community.mp4' },
      'school': { type: 'video', path: '/assets/level11vids/school.mp4' },
      'park': { type: 'video', path: '/assets/level11vids/park.mp4' },
      'house': { type: 'video', path: '/assets/level11vids/house.mp4' }
    }
  },
  {
    id: 103,
    level: 'level11',
    question: "Which word is right for this sign?",
    options: [
      "garden",
      "church",
      "hospital",
      "school"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level11vids/school.mp4',
    correctAnswer: "d. school",
    optionsAreMedia: false
  },
  {
    id: 104,
    level: 'level11',
    question: "What does this sign mean?",
    options: [
      "police station",
      "house",
      "community",
      "garden"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level11vids/police station.mp4',
    correctAnswer: "a. police station",
    optionsAreMedia: false
  },
  {
    id: 105,
    level: 'level11',
    question: "What place is shown in the video?",
    options: [
      "park",
      "garden",
      "community",
      "house"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level11vids/park.mp4',
    correctAnswer: "a. park",
    optionsAreMedia: false
  },
  {
    id: 106,
    level: 'level11',
    question: "Identify the place being shown.",
    options: [
      "community",
      "garden",
      "police station",
      "house"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level11vids/garden.mp4',
    correctAnswer: "b. garden",
    optionsAreMedia: false
  },
  {
    id: 107,
    level: 'level11',
    question: "Find the video with the right sign for this picture.",
    options: [
      "clinic",
      "community",
      "church",
      "police station"
    ],
    mediaType: 'image',
    mediaPath: '/assets/level11pics/church.jpg',
    correctAnswer: "c. church",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'clinic': { type: 'video', path: '/assets/level11vids/clinic.mp4' },
      'community': { type: 'video', path: '/assets/level11vids/community.mp4' },
      'church': { type: 'video', path: '/assets/level11vids/church.mp4' },
      'police station': { type: 'video', path: '/assets/level11vids/police station.mp4' }
    }
  },
  {
    id: 108,
    level: 'level11',
    question: "What place is this?",
    options: [
      "church",
      "house",
      "library",
      "Clinic"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level11vids/library.mp4',
    correctAnswer: "c. library",
    optionsAreMedia: false
  },
  {
    id: 109,
    level: 'level11',
    question: "What does this sign mean?",
    options: [
      "garden",
      "park",
      "clinic",
      "house"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level11vids/house.mp4',
    correctAnswer: "d. house",
    optionsAreMedia: false
  },
  {
    id: 110,
    level: 'level11',
    question: "Find the video with the right sign for the word clinic.",
    options: [
      "inside",
      "clinic",
      "outside",
      "library"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "b. clinic",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'inside': { type: 'video', path: '/assets/level11vids/inside.mp4' },
      'clinic': { type: 'video', path: '/assets/level11vids/clinic.mp4' },
      'outside': { type: 'video', path: '/assets/level11vids/outside.mp4' },
      'library': { type: 'video', path: '/assets/level11vids/library.mp4' }
    }
  },
  // Level 12 Questions (Verbs/Actions)
  {
    id: 111,
    level: 'level12',
    question: "Which video shows the correct sign for crawl?",
    options: [
      "run",
      "eat",
      "crawl",
      "bath"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "c. crawl",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
     
      'run': { type: 'video', path: '/assets/level12vids/run.mp4' },
      'eat': { type: 'video', path: '/assets/level12vids/eat.mp4' },
      'crawl': { type: 'video', path: '/assets/level12vids/crawl.mp4' },
      'bath': { type: 'video', path: '/assets/level12vids/bath.mp4' }
    }
  },
  {
    id: 112,
    level: 'level12',
    question: "What does this sign mean?",
    options: [
      "write",
      "drink",
      "eat",
      "bath"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level12vids/drink.mp4',
    correctAnswer: "b. drink",
    optionsAreMedia: false
  },
  {
    id: 113,
    level: 'level12',
    question: "Find the video with the right sign for the word run.",
    options: [
      "run",
      "walk",
      "crawl",
      "write"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "a. run",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'run': { type: 'video', path: '/assets/level12vids/run.mp4' },
      'walk': { type: 'video', path: '/assets/level12vids/walk.mp4' },
      'crawl': { type: 'video', path: '/assets/level12vids/crawl.mp4' },
      'write': { type: 'video', path: '/assets/level12vids/write.mp4' }
    }
  },
  {
    id: 114,
    level: 'level12',
    question: "Identify the verb being shown.",
    options: [
      "draw",
      "run",
      "eat",
      "bath"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level12vids/eat.mp4',
    correctAnswer: "c. eat",
    optionsAreMedia: false
  },
  {
    id: 115,
    level: 'level12',
    question: "Which one shows the sign for sleep?",
    options: [
      "run",
      "walk",
      "sleep",
      "drink"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "c. sleep",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'run': { type: 'video', path: '/assets/level12vids/run.mp4' },
      'walk': { type: 'video', path: '/assets/level12vids/walk.mp4' },
      'sleep': { type: 'video', path: '/assets/level12vids/sleep.mp4' },
      'drink': { type: 'video', path: '/assets/level12vids/drink.mp4' }
    }
  },
  {
    id: 116,
    level: 'level12',
    question: "Identify the verb being shown.",
    options: [
      "sleep",
      "crawl",
      "walk",
      "run"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level12vids/walk.mp4',
    correctAnswer: "c. walk",
    optionsAreMedia: false
  },
  {
    id: 117,
    level: 'level12',
    question: "What sign is shown in the video?",
    options: [
      "draw",
      "crawl",
      "bath",
      "read"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level12vids/draw.mp4',
    correctAnswer: "a. draw",
    optionsAreMedia: false
  },
  {
    id: 118,
    level: 'level12',
    question: "Which word is right for this sign?",
    options: [
      "sleep",
      "read",
      "run",
      "walk"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level12vids/read.mp4',
    correctAnswer: "b. read",
    optionsAreMedia: false
  },
  {
    id: 119,
    level: 'level12',
    question: "Identify the word being shown.",
    options: [
      "sleep",
      "draw",
      "eat",
      "write"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level12vids/write.mp4',
    correctAnswer: "d. write",
    optionsAreMedia: false
  },
  {
    id: 120,
    level: 'level12',
    question: "Tap the video with the sign for bath.",
    options: [
      "walk",
      "bath",
      "run",
      "sleep"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "b. bath",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'walk': { type: 'video', path: '/assets/level12vids/walk.mp4' },
      'bath': { type: 'video', path: '/assets/level12vids/bath.mp4' },
      'run': { type: 'video', path: '/assets/level12vids/run.mp4' },
      'sleep': { type: 'video', path: '/assets/level12vids/sleep.mp4' }
    }
  },
  // Level 13 Questions (Objects/School Supplies)
  {
    id: 121,
    level: 'level13',
    question: "Which video shows the sign for this object?",
    options: [
      "Bag",
      "Crayon",
      "Shoes",
      "Clothes"
    ],
    mediaType: 'image',
    mediaPath: '/assets/level13pics/shoes.jpg',
    correctAnswer: "c. Shoes",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'Bag': { type: 'video', path: '/assets/level13vids/bag.mp4' },
      'Crayon': { type: 'video', path: '/assets/level13vids/crayon.mp4' },
      'Shoes': { type: 'video', path: '/assets/level13vids/shoes.mp4' },
      'Clothes': { type: 'video', path: '/assets/level13vids/clothes.mp4' }
    }
  },
  {
    id: 122,
    level: 'level13',
    question: "What word is this sign?",
    options: [
      "Ballpen",
      "Crayon",
      "Pencil",
      "Paper"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level13vids/pencil.mp4',
    correctAnswer: "c. Pencil",
    optionsAreMedia: false
  },
  {
    id: 123,
    level: 'level13',
    question: "Tap the video with the sign for 'Eraser'.",
    options: [
      "eraser",
      "bag",
      "crayon",
      "pencil"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "a. eraser",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'eraser': { type: 'video', path: '/assets/level13vids/eraser.mp4' },
      'bag': { type: 'video', path: '/assets/level13vids/bag.mp4' },
      'crayon': { type: 'video', path: '/assets/level13vids/crayon.mp4' },
      'pencil': { type: 'video', path: '/assets/level13vids/pencil.mp4' }
    }
  },
  {
    id: 124,
    level: 'level13',
    question: "What does this sign mean?",
    options: [
      "Toothpaste",
      "Toothbrush",
      "Hairbrush",
      "Towel"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level13vids/toothbrush.mp4',
    correctAnswer: "b. Toothbrush",
    optionsAreMedia: false
  },
  {
    id: 125,
    level: 'level13',
    question: "Which word is right for this sign?",
    options: [
      "Towel",
      "Clothes",
      "Toothpaste",
      "Soap"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level13vids/towel.mp4',
    correctAnswer: "a. Towel",
    optionsAreMedia: false
  },
  {
    id: 126,
    level: 'level13',
    question: "What video shows the sign for shampoo?",
    options: [
      "soap",
      "towel",
      "toothbrush",
      "shampoo"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "d. shampoo",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'soap': { type: 'video', path: '/assets/level13vids/soap.mp4' },
      'towel': { type: 'video', path: '/assets/level13vids/towel.mp4' },
      'toothbrush': { type: 'video', path: '/assets/level13vids/toothbrush.mp4' },
      'shampoo': { type: 'video', path: '/assets/level13vids/shampoo.mp4' }
    }
  },
  {
    id: 127,
    level: 'level13',
    question: "Which one shows the sign for 'paper'?",
    options: [
      "Pencil",
      "Crayon",
      "Paper",
      "Bag"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "c. Paper",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'Pencil': { type: 'video', path: '/assets/level13vids/pencil.mp4' },
      'Crayon': { type: 'video', path: '/assets/level13vids/crayon.mp4' },
      'Paper': { type: 'video', path: '/assets/level13vids/paper.mp4' },
      'Bag': { type: 'video', path: '/assets/level13vids/bag.mp4' }
    }
  },
  {
    id: 128,
    level: 'level13',
    question: "Which word is right for this sign?",
    options: [
      "Pencil",
      "Crayon",
      "Ballpen",
      "Bag"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level13vids/crayon.mp4',
    correctAnswer: "b. Crayon",
    optionsAreMedia: false
  },
  {
    id: 129,
    level: 'level13',
    question: "What sign is correct for this picture?",
    options: [
      "Shampoo",
      "Towel",
      "Clothes",
      "Soap"
    ],
    mediaType: 'image',
    mediaPath: '/assets/level13pics/soap.jpg',
    correctAnswer: "d. Soap",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'Shampoo': { type: 'video', path: '/assets/level13vids/shampoo.mp4' },
      'Towel': { type: 'video', path: '/assets/level13vids/towel.mp4' },
      'Clothes': { type: 'video', path: '/assets/level13vids/clothes.mp4' },
      'Soap': { type: 'video', path: '/assets/level13vids/soap.mp4' }
    }
  },
  {
    id: 130,
    level: 'level13',
    question: "What does this sign mean?",
    options: [
      "Ballpen",
      "Pencil",
      "Crayon",
      "Bag"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level13vids/ballpen.mp4',
    correctAnswer: "a. Ballpen",
    optionsAreMedia: false
  },
  {
    id: 131,
    level: 'level13',
    question: "Which one shows the sign for 'bag'?",
    options: [
      "bag",
      "clothes",
      "shoes",
      "eraser"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "a. bag",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'bag': { type: 'video', path: '/assets/level13vids/bag.mp4' },
      'clothes': { type: 'video', path: '/assets/level13vids/clothes.mp4' },
      'shoes': { type: 'video', path: '/assets/level13vids/shoes.mp4' },
      'eraser': { type: 'video', path: '/assets/level13vids/eraser.mp4' }
    }
  },
  {
    id: 132,
    level: 'level13',
    question: "Choose the sign for the word 'Hairbrush'",
    options: [
      "toothbrush",
      "hairbrush",
      "soap",
      "shampoo"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "b. hairbrush",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'toothbrush': { type: 'video', path: '/assets/level13vids/toothbrush.mp4' },
      'hairbrush': { type: 'video', path: '/assets/level13vids/hairbrush.mp4' },
      'soap': { type: 'video', path: '/assets/level13vids/soap.mp4' },
      'shampoo': { type: 'video', path: '/assets/level13vids/shampoo.mp4' }
    }
  },
  {
    id: 133,
    level: 'level13',
    question: "What word is this sign?",
    options: [
      "Book",
      "Paper",
      "Bag",
      "Pencil"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level13vids/book.mp4',
    correctAnswer: "a. Book",
    optionsAreMedia: false
  },
  {
    id: 134,
    level: 'level13',
    question: "What video shows the sign for this picture?",
    options: [
      "soap",
      "toothbrush",
      "hairbrush",
      "toothpaste"
    ],
    mediaType: 'image',
    mediaPath: '/assets/level13pics/toothpaste.jpg',
    correctAnswer: "d. toothpaste",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'soap': { type: 'video', path: '/assets/level13vids/soap.mp4' },
      'toothbrush': { type: 'video', path: '/assets/level13vids/toothbrush.mp4' },
      'hairbrush': { type: 'video', path: '/assets/level13vids/hairbrush.mp4' },
      'toothpaste': { type: 'video', path: '/assets/level13vids/toothpaste.mp4' }
    }
  },
  {
    id: 135,
    level: 'level13',
    question: "Which word is right for this sign?",
    options: [
      "Clothes",
      "Shoes",
      "Towel",
      "Hairbrush"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level13vids/clothes.mp4',
    correctAnswer: "a. Clothes",
    optionsAreMedia: false
  },
  // Level 14 Questions (Family/People)
  {
    id: 136,
    level: 'level14',
    question: "Which one shows the sign for the word Mother?",
    options: [
      "father",
      "mother",
      "sister",
      "brother"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "b. mother",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'father': { type: 'video', path: '/assets/level14vids/father.mp4' },
      'mother': { type: 'video', path: '/assets/level14vids/mother.mp4' },
      'sister': { type: 'video', path: '/assets/level14vids/sister.mp4' },
      'brother': { type: 'video', path: '/assets/level14vids/brother.mp4' }
    }
  },
  {
    id: 137,
    level: 'level14',
    question: "Identify the sign is being shown in the video.",
    options: [
      "Family",
      "Classmate",
      "Student",
      "Teacher"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level14vids/classmate.mp4',
    correctAnswer: "b. Classmate",
    optionsAreMedia: false
  },
  {
    id: 138,
    level: 'level14',
    question: "What does this sign mean?",
    options: [
      "Cousin",
      "Mother",
      "Sister",
      "Auntie"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level14vids/sister.mp4',
    correctAnswer: "c. Sister",
    optionsAreMedia: false
  },
  {
    id: 139,
    level: 'level14',
    question: "What is the correct sign of Cousin?",
    options: [
      "Cousin",
      "Mother",
      "Sister",
      "Auntie"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "a. Cousin",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'Cousin': { type: 'video', path: '/assets/level14vids/cousin.mp4' },
      'Mother': { type: 'video', path: '/assets/level14vids/mother.mp4' },
      'Sister': { type: 'video', path: '/assets/level14vids/sister.mp4' },
      'Auntie': { type: 'video', path: '/assets/level14vids/auntie.mp4' }
    }
  },
  {
    id: 140,
    level: 'level14',
    question: "Which video shows the right sign for Grandfather?",
    options: [
      "Uncle",
      "Mother",
      "Cousin",
      "Grandfather"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "d. Grandfather",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'Uncle': { type: 'video', path: '/assets/level14vids/uncle.mp4' },
      'Mother': { type: 'video', path: '/assets/level14vids/mother.mp4' },
      'Cousin': { type: 'video', path: '/assets/level14vids/cousin.mp4' },
      'Grandfather': { type: 'video', path: '/assets/level14vids/grandfather.mp4' }
    }
  },
  {
    id: 141,
    level: 'level14',
    question: "Which video shows the right sign for the word Teacher?",
    options: [
      "Teacher",
      "Classmate",
      "Friend",
      "Family"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "a. Teacher",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'Teacher': { type: 'video', path: '/assets/level14vids/teacher.mp4' },
      'Classmate': { type: 'video', path: '/assets/level14vids/classmate.mp4' },
      'Friend': { type: 'video', path: '/assets/level14vids/friend.mp4' },
      'Family': { type: 'video', path: '/assets/level14vids/family.mp4' }
    }
  },
  {
    id: 142,
    level: 'level14',
    question: "Observe the sign of \"Uncle\". Which Video matches?",
    options: [
      "Uncle",
      "Mother",
      "Cousin",
      "Grandfather"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "a. Uncle",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'Uncle': { type: 'video', path: '/assets/level14vids/uncle.mp4' },
      'Mother': { type: 'video', path: '/assets/level14vids/mother.mp4' },
      'Cousin': { type: 'video', path: '/assets/level14vids/cousin.mp4' },
      'Grandfather': { type: 'video', path: '/assets/level14vids/grandfather.mp4' }
    }
  },
  {
    id: 143,
    level: 'level14',
    question: "What is the correct sign for this image?",
    options: [
      "Uncle",
      "Father",
      "Grandfather",
      "Brother"
    ],
    mediaType: 'image',
    mediaPath: '/assets/level14pics/brother.jpg',
    correctAnswer: "d. Brother",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'Uncle': { type: 'video', path: '/assets/level14vids/uncle.mp4' },
      'Father': { type: 'video', path: '/assets/level14vids/father.mp4' },
      'Grandfather': { type: 'video', path: '/assets/level14vids/grandfather.mp4' },
      'Brother': { type: 'video', path: '/assets/level14vids/brother.mp4' }
    }
  },
  {
    id: 144,
    level: 'level14',
    question: "Which word is right for this sign?",
    options: [
      "Uncle",
      "Father",
      "Grandfather",
      "Brother"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level14vids/father.mp4',
    correctAnswer: "b. Father",
    optionsAreMedia: false
  },
  {
    id: 145,
    level: 'level14',
    question: "If you see the sign of \"Auntie\" Which video matches?",
    options: [
      "Auntie",
      "Mother",
      "Sister",
      "Grandmother"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "a. Auntie",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'Auntie': { type: 'video', path: '/assets/level14vids/auntie.mp4' },
      'Mother': { type: 'video', path: '/assets/level14vids/mother.mp4' },
      'Sister': { type: 'video', path: '/assets/level14vids/sister.mp4' },
      'Grandmother': { type: 'video', path: '/assets/level14vids/grandmother.mp4' }
    }
  },
  {
    id: 146,
    level: 'level14',
    question: "Find the video with the right sign for this picture.",
    options: [
      "Family",
      "Student",
      "Teacher",
      "Friend"
    ],
    mediaType: 'image',
    mediaPath: '/assets/level14pics/student.jpg',
    correctAnswer: "b. Student",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'Family': { type: 'video', path: '/assets/level14vids/family.mp4' },
      'Student': { type: 'video', path: '/assets/level14vids/student.mp4' },
      'Teacher': { type: 'video', path: '/assets/level14vids/teacher.mp4' },
      'Friend': { type: 'video', path: '/assets/level14vids/friend.mp4' }
    }
  },
  {
    id: 147,
    level: 'level14',
    question: "Which of the following video shows the correct sign for the word \"Baby\"?",
    options: [
      "Father",
      "Mother",
      "baby",
      "Sister"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "c. baby",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'Father': { type: 'video', path: '/assets/level14vids/father.mp4' },
      'Mother': { type: 'video', path: '/assets/level14vids/mother.mp4' },
      'baby': { type: 'video', path: '/assets/level14vids/baby.mp4' },
      'Sister': { type: 'video', path: '/assets/level14vids/sister.mp4' }
    }
  },
  {
    id: 148,
    level: 'level14',
    question: "Identify the sign is being shown in the video.",
    options: [
      "Auntie",
      "Uncle",
      "Baby",
      "Grandmother"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level14vids/grandmother.mp4',
    correctAnswer: "d. Grandmother",
    optionsAreMedia: false
  },
  {
    id: 149,
    level: 'level14',
    question: "What word is this sign?",
    options: [
      "Teacher",
      "Classmate",
      "Friend",
      "Family"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level14vids/family.mp4',
    correctAnswer: "d. Family",
    optionsAreMedia: false
  },
  {
    id: 150,
    level: 'level14',
    question: "What is the correct sign for the word Friend?",
    options: [
      "Classmate",
      "Friend",
      "Teacher",
      "Student"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "b. Friend",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'Classmate': { type: 'video', path: '/assets/level14vids/classmate.mp4' },
      'Friend': { type: 'video', path: '/assets/level14vids/friend.mp4' },
      'Teacher': { type: 'video', path: '/assets/level14vids/teacher.mp4' },
      'Student': { type: 'video', path: '/assets/level14vids/student.mp4' }
    }
  },
  // Level 15 Questions (Question Words)
  {
    id: 151,
    level: 'level15',
    question: "Can you find the sign for the word yes?",
    options: [
      "no",
      "yes",
      "what",
      "who"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "b. yes",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'no': { type: 'video', path: '/assets/level15vids/no.mp4' },
      'yes': { type: 'video', path: '/assets/level15vids/yes.mp4' },
      'what': { type: 'video', path: '/assets/level15vids/what.mp4' },
      'who': { type: 'video', path: '/assets/level15vids/who.mp4' }
    }
  },
  {
    id: 152,
    level: 'level15',
    question: "What does this sign mean?",
    options: [
      "yes",
      "no",
      "how",
      "when"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level15vids/how.mp4',
    correctAnswer: "c. how",
    optionsAreMedia: false
  },
  {
    id: 153,
    level: 'level15',
    question: "What word is this?",
    options: [
      "when",
      "who",
      "yes",
      "no"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level15vids/no.mp4',
    correctAnswer: "d. no",
    optionsAreMedia: false
  },
  {
    id: 154,
    level: 'level15',
    question: "Which one shows the sign for the word how?",
    options: [
      "how",
      "where",
      "who",
      "how many"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "a. how",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'how': { type: 'video', path: '/assets/level15vids/how.mp4' },
      'where': { type: 'video', path: '/assets/level15vids/where.mp4' },
      'who': { type: 'video', path: '/assets/level15vids/who.mp4' },
      'how many': { type: 'video', path: '/assets/level15vids/how many.mp4' }
    }
  },
  {
    id: 155,
    level: 'level15',
    question: "Find the video with the right sign for the word where.",
    options: [
      "where",
      "when",
      "why",
      "what"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "a. where",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'where': { type: 'video', path: '/assets/level15vids/where.mp4' },
      'when': { type: 'video', path: '/assets/level15vids/when.mp4' },
      'why': { type: 'video', path: '/assets/level15vids/why.mp4' },
      'what': { type: 'video', path: '/assets/level15vids/what.mp4' }
    }
  },
  {
    id: 156,
    level: 'level15',
    question: "Which word is right for this sign?",
    options: [
      "when",
      "yes",
      "how",
      "no"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level15vids/when.mp4',
    correctAnswer: "a. when",
    optionsAreMedia: false
  },
  {
    id: 157,
    level: 'level15',
    question: "Identify the word being shown.",
    options: [
      "yes",
      "who",
      "how",
      "how much"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level15vids/how much.mp4',
    correctAnswer: "d. how much",
    optionsAreMedia: false
  },
  {
    id: 158,
    level: 'level15',
    question: "What does this sign mean?",
    options: [
      "where",
      "when",
      "why",
      "what"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level15vids/why.mp4',
    correctAnswer: "c. why",
    optionsAreMedia: false
  },
  {
    id: 159,
    level: 'level15',
    question: "Can you find the sign for the word why?",
    options: [
      "why",
      "where",
      "when",
      "who"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "a. why",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'why': { type: 'video', path: '/assets/level15vids/why.mp4' },
      'where': { type: 'video', path: '/assets/level15vids/where.mp4' },
      'when': { type: 'video', path: '/assets/level15vids/when.mp4' },
      'who': { type: 'video', path: '/assets/level15vids/who.mp4' }
    }
  },
  {
    id: 160,
    level: 'level15',
    question: "What word is shown in the video?",
    options: [
      "how many",
      "yes",
      "how much",
      "when"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level15vids/how many.mp4',
    correctAnswer: "a. how many",
    optionsAreMedia: false
  },
  {
    id: 161,
    level: 'level15',
    question: "Tap the video with the sign for the word who.",
    options: [
      "who",
      "why",
      "no",
      "where"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "a. who",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'who': { type: 'video', path: '/assets/level15vids/who.mp4' },
      'why': { type: 'video', path: '/assets/level15vids/why.mp4' },
      'no': { type: 'video', path: '/assets/level15vids/no.mp4' },
      'where': { type: 'video', path: '/assets/level15vids/where.mp4' }
    }
  },
  {
    id: 162,
    level: 'level15',
    question: "Which word is right for this sign?",
    options: [
      "why",
      "who",
      "what",
      "how"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level15vids/what.mp4',
    correctAnswer: "c. what",
    optionsAreMedia: false
  },
  {
    id: 163,
    level: 'level15',
    question: "Which one shows the sign for the word when?",
    options: [
      "what",
      "when",
      "why",
      "who"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "b. when",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'what': { type: 'video', path: '/assets/level15vids/what.mp4' },
      'when': { type: 'video', path: '/assets/level15vids/when.mp4' },
      'why': { type: 'video', path: '/assets/level15vids/why.mp4' },
      'who': { type: 'video', path: '/assets/level15vids/who.mp4' }
    }
  },
  {
    id: 164,
    level: 'level15',
    question: "Identify the word being shown.",
    options: [
      "where",
      "who",
      "what",
      "why"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level15vids/where.mp4',
    correctAnswer: "a. where",
    optionsAreMedia: false
  },
  {
    id: 165,
    level: 'level15',
    question: "What word is shown in the video?",
    options: [
      "how many",
      "how much",
      "how",
      "where"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level15vids/how much.mp4',
    correctAnswer: "b. how much",
    optionsAreMedia: false
  },
  // Level 16 Questions (Emergency/Safety)
  {
    id: 166,
    level: 'level16',
    question: "Which of the following video shows the correct sign for the phrase Call for help?",
    options: [
      "Help",
      "Emergency",
      "Call for help",
      "Not safe"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "c. Call for help",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'Help': { type: 'video', path: '/assets/level16vids/help.mp4' },
      'Emergency': { type: 'video', path: '/assets/level16vids/emergency.mp4' },
      'Call for help': { type: 'video', path: '/assets/level16vids/call for help.mp4' },
      'Not safe': { type: 'video', path: '/assets/level16vids/not safe.mp4' }
    }
  },
  {
    id: 167,
    level: 'level16',
    question: "What word is this sign?",
    options: [
      "Help",
      "Earthquake",
      "Emergency",
      "Flood"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level16vids/flood.mp4',
    correctAnswer: "d. Flood",
    optionsAreMedia: false
  },
  {
    id: 168,
    level: 'level16',
    question: "Which of the following is the correct sign for Help?",
    options: [
      "Help!",
      "Danger",
      "Not Safe",
      "Rescue"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "a. Help!",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'Help!': { type: 'video', path: '/assets/level16vids/help.mp4' },
      'Danger': { type: 'video', path: '/assets/level16vids/danger.mp4' },
      'Not Safe': { type: 'video', path: '/assets/level16vids/not safe.mp4' },
      'Rescue': { type: 'video', path: '/assets/level16vids/rescue.mp4' }
    }
  },
  {
    id: 169,
    level: 'level16',
    question: "Which video matches the correct sign of Earthquake?",
    options: [
      "Emergency",
      "Help",
      "Rescue",
      "Earthquake"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "d. Earthquake",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'Emergency': { type: 'video', path: '/assets/level16vids/emergency.mp4' },
      'Help': { type: 'video', path: '/assets/level16vids/help.mp4' },
      'Rescue': { type: 'video', path: '/assets/level16vids/rescue.mp4' },
      'Earthquake': { type: 'video', path: '/assets/level16vids/earthquake.mp4' }
    }
  },
  {
    id: 170,
    level: 'level16',
    question: "Find the word for this Video.",
    options: [
      "First Aid Kit",
      "Whistle",
      "Rescue",
      "Flashlight"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level16vids/flashlight.mp4',
    correctAnswer: "d. Flashlight",
    optionsAreMedia: false
  },
  {
    id: 171,
    level: 'level16',
    question: "Which of the following video shows the correct sign for the word \"Typhoon\"?",
    options: [
      "Flood",
      "Rain",
      "Typhoon",
      "Fire"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "c. Typhoon",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'Flood': { type: 'video', path: '/assets/level16vids/flood.mp4' },
      'Rain': { type: 'video', path: '/assets/level16vids/rain.mp4' },
      'Typhoon': { type: 'video', path: '/assets/level16vids/typhoon.mp4' },
      'Fire': { type: 'video', path: '/assets/level16vids/fire.mp4' }
    }
  },
  {
    id: 172,
    level: 'level16',
    question: "Tap the video with the sign for the word Not Safe.",
    options: [
      "Not Safe",
      "Rescue",
      "Safe",
      "First Aid kit"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "a. Not Safe",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'Not Safe': { type: 'video', path: '/assets/level16vids/not safe.mp4' },
      'Rescue': { type: 'video', path: '/assets/level16vids/rescue.mp4' },
      'Safe': { type: 'video', path: '/assets/level16vids/safe.mp4' },
      'First Aid kit': { type: 'video', path: '/assets/level16vids/first aid kit.mp4' }
    }
  },
  {
    id: 173,
    level: 'level16',
    question: "What word is being shown in the video?",
    options: [
      "Help",
      "Emergency",
      "Rescue",
      "Fire"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level16vids/emergency.mp4',
    correctAnswer: "b. Emergency",
    optionsAreMedia: false
  },
  {
    id: 174,
    level: 'level16',
    question: "Which one shows the sign for the word Danger?",
    options: [
      "Emergency",
      "Rescue",
      "Danger",
      "First Aid kit"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "c. Danger",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'Emergency': { type: 'video', path: '/assets/level16vids/emergency.mp4' },
      'Rescue': { type: 'video', path: '/assets/level16vids/rescue.mp4' },
      'Danger': { type: 'video', path: '/assets/level16vids/danger.mp4' },
      'First Aid kit': { type: 'video', path: '/assets/level16vids/first aid kit.mp4' }
    }
  },
  {
    id: 175,
    level: 'level16',
    question: "Which word is right for this sign?",
    options: [
      "Not Safe",
      "Rescue",
      "Safe",
      "First Aid Kit"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level16vids/safe.mp4',
    correctAnswer: "c. Safe",
    optionsAreMedia: false
  },
  {
    id: 176,
    level: 'level16',
    question: "What is the correct sign of the word Rescue?",
    options: [
      "Safe",
      "Rescue",
      "Danger",
      "Help"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "b. Rescue",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'Safe': { type: 'video', path: '/assets/level16vids/safe.mp4' },
      'Rescue': { type: 'video', path: '/assets/level16vids/rescue.mp4' },
      'Danger': { type: 'video', path: '/assets/level16vids/danger.mp4' },
      'Help': { type: 'video', path: '/assets/level16vids/help.mp4' }
    }
  },
  {
    id: 177,
    level: 'level16',
    question: "Find the video with the right sign for this picture.",
    options: [
      "Emergency",
      "Safe",
      "Help",
      "First Aid kit"
    ],
    mediaType: 'image',
    mediaPath: '/assets/level16pics/first aid kit.jpg',
    correctAnswer: "d. First Aid kit",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'Emergency': { type: 'video', path: '/assets/level16vids/emergency.mp4' },
      'Safe': { type: 'video', path: '/assets/level16vids/safe.mp4' },
      'Help': { type: 'video', path: '/assets/level16vids/help.mp4' },
      'First Aid kit': { type: 'video', path: '/assets/level16vids/first aid kit.mp4' }
    }
  },
  {
    id: 178,
    level: 'level16',
    question: "What word is being shown in the video?",
    options: [
      "Rain",
      "Flood",
      "Typhoon",
      "Rescue"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level16vids/rain.mp4',
    correctAnswer: "a. Rain",
    optionsAreMedia: false
  },
  {
    id: 179,
    level: 'level16',
    question: "What is the correct sign for this image?",
    options: [
      "Flashlight",
      "Whistle",
      "Danger",
      "First Aid kit"
    ],
    mediaType: 'image',
    mediaPath: '/assets/level16pics/whistle.jpg',
    correctAnswer: "b. Whistle",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'Flashlight': { type: 'video', path: '/assets/level16vids/flashlight.mp4' },
      'Whistle': { type: 'video', path: '/assets/level16vids/whistle.mp4' },
      'Danger': { type: 'video', path: '/assets/level16vids/danger.mp4' },
      'First Aid kit': { type: 'video', path: '/assets/level16vids/first aid kit.mp4' }
    }
  },
  {
    id: 180,
    level: 'level16',
    question: "Can you find the sign for this image?",
    options: [
      "Fire",
      "Flood",
      "Rain",
      "Emergency"
    ],
    mediaType: 'image',
    mediaPath: '/assets/level16pics/fire.jpg',
    correctAnswer: "a. Fire",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'Fire': { type: 'video', path: '/assets/level16vids/fire.mp4' },
      'Flood': { type: 'video', path: '/assets/level16vids/flood.mp4' },
      'Rain': { type: 'video', path: '/assets/level16vids/rain.mp4' },
      'Emergency': { type: 'video', path: '/assets/level16vids/emergency.mp4' }
    }
  },
  // Level 17 Questions (Greetings/Introductions)
  {
    id: 181,
    level: 'level17',
    question: "What phrase is being signed?",
    options: [
      "Good evening!",
      "Take care!",
      "Hi!",
      "Goodbye!"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level17vids/hi.mp4',
    correctAnswer: "c. Hi!",
    optionsAreMedia: false
  },
  {
    id: 182,
    level: 'level17',
    question: "What greeting is shown?",
    options: [
      "Good morning!",
      "Good night!",
      "Hello!",
      "I love you!"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level17vids/good morning.mp4',
    correctAnswer: "a. Good morning!",
    optionsAreMedia: false
  },
  {
    id: 183,
    level: 'level17',
    question: "What sign is this?",
    options: [
      "Goodbye!",
      "Welcome!",
      "Good afternoon!",
      "My name"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level17vids/goodbye.mp4',
    correctAnswer: "a. Goodbye!",
    optionsAreMedia: false
  },
  {
    id: 184,
    level: 'level17',
    question: "Which video shows the sign for 'Good afternoon'?",
    options: [
      "Good night",
      "Good afternoon",
      "Good morning",
      "Goodbye"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "b. Good afternoon",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'Good night': { type: 'video', path: '/assets/level17vids/good night.mp4' },
      'Good afternoon': { type: 'video', path: '/assets/level17vids/good afternoon.mp4' },
      'Good morning': { type: 'video', path: '/assets/level17vids/good morning.mp4' },
      'Goodbye': { type: 'video', path: '/assets/level17vids/goodbye.mp4' }
    }
  },
  {
    id: 185,
    level: 'level17',
    question: "What is being signed?",
    options: [
      "Hi!",
      "My name",
      "Good evening!",
      "Take care!"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level17vids/good evening.mp4',
    correctAnswer: "c. Good evening!",
    optionsAreMedia: false
  },
  {
    id: 186,
    level: 'level17',
    question: "What does this sign mean?",
    options: [
      "My name",
      "My age",
      "I live",
      "Thank you!"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level17vids/my age.mp4',
    correctAnswer: "b. My age",
    optionsAreMedia: false
  },
  {
    id: 187,
    level: 'level17',
    question: "What phrase is being signed?",
    options: [
      "My birthday",
      "My name",
      "I love you!",
      "Good morning!"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level17vids/my birthday.mp4',
    correctAnswer: "a. My birthday",
    optionsAreMedia: false
  },
  {
    id: 188,
    level: 'level17',
    question: "What is the correct sign for 'See you soon'?",
    options: [
      "Goodbye",
      "See you soon",
      "Good evening",
      "Thank you"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "b. See you soon",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'Goodbye': { type: 'video', path: '/assets/level17vids/goodbye.mp4' },
      'See you soon': { type: 'video', path: '/assets/level17vids/see you soon.mp4' },
      'Good evening': { type: 'video', path: '/assets/level17vids/good evening.mp4' },
      'Thank you': { type: 'video', path: '/assets/level17vids/thank you.mp4' }
    }
  },
  {
    id: 189,
    level: 'level17',
    question: "What sign is this?",
    options: [
      "My birthday",
      "My name",
      "Take care!",
      "Excuse me!"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level17vids/my name.mp4',
    correctAnswer: "b. My name",
    optionsAreMedia: false
  },
  {
    id: 190,
    level: 'level17',
    question: "What phrase is being signed?",
    options: [
      "My name",
      "My age",
      "I live",
      "Thank you!"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level17vids/i live.mp4',
    correctAnswer: "c. I live",
    optionsAreMedia: false
  },
  // Level 18 Questions (Polite Expressions)
  {
    id: 191,
    level: 'level18',
    question: "Which one shows the sign for happy birthday?",
    options: [
      "please",
      "I'm fine",
      "happy birthday",
      "thank you"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "c. happy birthday",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'please': { type: 'video', path: '/assets/level18vids/please.mp4' },
      "I'm fine": { type: 'video', path: '/assets/level18vids/i\'m fine.mp4' },
      'happy birthday': { type: 'video', path: '/assets/level18vids/happy birthday.mp4' },
      'thank you': { type: 'video', path: '/assets/level18vids/thank you.mp4' }
    }
  },
  {
    id: 192,
    level: 'level18',
    question: "Which word is right for this sign?",
    options: [
      "I don't understand.",
      "Thank you!",
      "Sorry.",
      "Please."
    ],
    mediaType: 'video',
    mediaPath: '/assets/level18vids/i don\'t understand.mp4',
    correctAnswer: "a. I don't understand.",
    optionsAreMedia: false
  },
  {
    id: 193,
    level: 'level18',
    question: "What does this sign mean?",
    options: [
      "Excuse me.",
      "Happy birthday!",
      "Please.",
      "I understand."
    ],
    mediaType: 'video',
    mediaPath: '/assets/level18vids/excuse me.mp4',
    correctAnswer: "a. Excuse me.",
    optionsAreMedia: false
  },
  {
    id: 194,
    level: 'level18',
    question: "Find the video with the right sign for \"Thank you!\"",
    options: [
      "excuse me",
      "I don't understand",
      "please",
      "thank you"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "d. thank you",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'excuse me': { type: 'video', path: '/assets/level18vids/excuse me.mp4' },
      "I don't understand": { type: 'video', path: '/assets/level18vids/i don\'t understand.mp4' },
      'please': { type: 'video', path: '/assets/level18vids/please.mp4' },
      'thank you': { type: 'video', path: '/assets/level18vids/thank you.mp4' }
    }
  },
  {
    id: 195,
    level: 'level18',
    question: "What sign is this?",
    options: [
      "I don't understand.",
      "I'm not fine.",
      "Please.",
      "I love you!"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level18vids/please.mp4',
    correctAnswer: "c. Please.",
    optionsAreMedia: false
  },
  {
    id: 196,
    level: 'level18',
    question: "Tap the video with the sign for \"I'm fine.\"",
    options: [
      "sorry",
      "thank you",
      "please",
      "I'm fine"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "d. I'm fine",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'sorry': { type: 'video', path: '/assets/level18vids/sorry.mp4' },
      'thank you': { type: 'video', path: '/assets/level18vids/thank you.mp4' },
      'please': { type: 'video', path: '/assets/level18vids/please.mp4' },
      "I'm fine": { type: 'video', path: '/assets/level18vids/i\'m fine.mp4' }
    }
  },
  {
    id: 197,
    level: 'level18',
    question: "Identify what is being shown.",
    options: [
      "Please.",
      "I'm fine.",
      "I don't understand.",
      "I love you!"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level18vids/i love you.mp4',
    correctAnswer: "d. I love you!",
    optionsAreMedia: false
  },
  {
    id: 198,
    level: 'level18',
    question: "What sign is shown in the video?",
    options: [
      "I love you!",
      "Take care!",
      "I'm fine.",
      "Happy birthday!"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level18vids/take care.mp4',
    correctAnswer: "b. Take care!",
    optionsAreMedia: false
  },
  {
    id: 199,
    level: 'level18',
    question: "Can you find the sign for \"I love you\"?",
    options: [
      "I love you",
      "excuse me",
      "sorry",
      "I'm fine"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "a. I love you",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'I love you': { type: 'video', path: '/assets/level18vids/i love you.mp4' },
      'excuse me': { type: 'video', path: '/assets/level18vids/excuse me.mp4' },
      'sorry': { type: 'video', path: '/assets/level18vids/sorry.mp4' },
      "I'm fine": { type: 'video', path: '/assets/level18vids/i\'m fine.mp4' }
    }
  },
  {
    id: 200,
    level: 'level18',
    question: "Which word is right for this sign?",
    options: [
      "I love you!",
      "Sorry!",
      "Please.",
      "Excuse me."
    ],
    mediaType: 'video',
    mediaPath: '/assets/level18vids/sorry.mp4',
    correctAnswer: "b. Sorry!",
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
                    
                    if (nextLevel <= 20) {
                      history.push(`/category/${categoryId}/level/${nextLevel}`);
                    } else {
                      history.push(`/category/${categoryId}`);
                    }
                  }}
                  className="back-button"
                  size="large"
                >
                  {level < 20 ? 'Continue Next Level' : 'Back to Levels'}
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


