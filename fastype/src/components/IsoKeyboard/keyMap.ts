interface KeyMap {
  [key: string]: { id: string; mod?: string | null , finger?: string};
}

export const keyMap: KeyMap = {
  //small caps
  "a": { id: "r2k2", finger: "left-pinky"},
  "b": { id: "r4k7", finger:"left-index" },
  "c": { id: "r4k5" , finger: "left-middle" },
  "d": { id: "r3k4" , finger : "left-middle"},
  "e": { id: "r2k4", finger: "left-middle" },
  "f": { id: "r3k5", finger : "left-index" },
  "g": { id: "r3k6" , finger: "left-index"},
  "h": { id: "r3k7" , finger :"right-index" },
  "i": { id: "r2k9", finger: "right-middle" },
  "j": { id: "r3k8", finger: "right-index" },
  "k": { id: "r3k9", finger: "right-middle" },
  "l": { id: "r3k10", finger: "right-ring" },
  "m": { id: "r3k11", finger: "right-pinky" },
  "n": { id: "r4k8", finger: "right-index" },
  "o": { id: "r2k10" , finger:"right-ring"},
  "p": { id: "r2k11", finger: "right-pinky"},
  "q": { id: "r3k2",finger: "left-pinky" },
  "r": { id: "r2k5", finger: "left-index" },
  "s": { id: "r3k3" , finger: "left-ring"},
  "t": { id: "r2k6", finger: "left-index"},
  "u": { id: "r2k8", finger: "right-index"},
  "v": { id: "r4k6", finger: "left-index"},
  "w": { id: "r4k3", finger: "left-pinky" },
  "x": { id: "r4k4", finger: "left-ring"},
  "y": { id: "r2k7", finger: "right-index"},
  "z": { id: "r2k3", finger: "left-ring"},

  //Capital letters
  "A": { id: "r2k2",finger: "left-pinky", mod: "r4k13" },
  "B": { id: "r4k7", finger:"left-index",mod: "r4k13" },
  "C": { id: "r4k5",finger: "left-middle", mod: "r4k13" },
  "D": { id: "r3k4",finger : "left-middle", mod: "r4k13" },
  "E": { id: "r2k4", finger: "left-middle",mod: "r4k13" },
  "F": { id: "r3k5",finger : "left-index" , mod: "r4k13" },
  "G": { id: "r3k6", finger: "left-index",mod: "r4k13" },
  "H": { id: "r3k7", finger :" right-index",mod: "r4k1" },
  "I": { id: "r2k9", finger: "right-middle",mod: "r4k1" },
  "J": { id: "r3k8", finger: "right-index",mod: "r4k1" },
  "K": { id: "r3k9", finger: "right-middle",mod: "r4k1" },
  "L": { id: "r3k10", finger: "right-ring", mod: "r4k1" },
  "M": { id: "r3k11", finger: "right-pinky",mod: "r4k1" },
  "N": { id: "r4k8",  finger: "right-index",mod: "r4k1" },
  "O": { id: "r2k10", finger:"right-ring",mod: "r4k1" },
  "P": { id: "r2k11", finger: "right-pinky",mod: "r4k1" },
  "Q": { id: "r3k2", finger: "left-pinky",mod: "r4k13" },
  "R": { id: "r2k5",finger: "left-index", mod: "r4k13" },
  "S": { id: "r3k3", finger: "left-ring",mod: "r4k13" },
  "T": { id: "r2k6", finger: "left-index",mod: "r4k13" },
  "U": { id: "r2k8", finger: "right-index",mod: "r4k1" },
  "V": { id: "r4k6", finger: "left-index",mod: "r4k13" },
  "W": { id: "r4k3",  finger: "left-pinky",mod: "r4k13" },
  "X": { id: "r4k4",  finger: "left-ring",mod: "r4k13" },
  "Y": { id: "r2k7", finger: "right-index",mod: "r4k1" },
  "Z": { id: "r2k3", finger: "left-ring",mod: "r4k13" },

  //Numbers
  "1": { id: "r1k2",finger:"left-pinky", mod: "r4k13" },
  "2": { id: "r1k3",finger:"left-pinky", mod: "r4k13" },
  "3": { id: "r1k4", finger:"left-ring",mod: "r4k13" },
  "4": { id: "r1k5",finger:"left-middle", mod: "r4k13" },
  "5": { id: "r1k6",finger:"left-index", mod: "r4k13" },
  "6": { id: "r1k7",finger:"left-index", mod: "r4k1" },
  "7": { id: "r1k8",finger:"right-index", mod: "r4k1" },
  "8": { id: "r1k9", finger:"right-middle",mod: "r4k1" },
  "9": { id: "r1k10", finger:"right-ring",mod: "r4k1" },
  "0": { id: "r1k11", finger:"right-pinky",mod: "r4k1" },

  //Special characters
  "&": { id: "r1k2", finger:"left-pinky" },
  "é": { id: "r1k3", finger:"left-pinky"},
  '"': { id: "r1k4", finger:"left-ring" },
  "'": { id: "r1k5", finger:"left-middle" },
  "(": { id: "r1k6", finger:"left-index" },
  "-": { id: "r1k7",finger:"left-index" },
  "è": { id: "r1k8", finger:"right-index" },
  "_": { id: "r1k9", finger:"right-middle"},
  "ç": { id: "r1k10", finger:"right-ring" },
  "à": { id: "r1k11", finger:"right-pinky"},
  ")": { id: "r1k12", finger:"right-pinky"},
  "=": { id: "r1k13", finger:"right-pinky"},
  "~": { id: "r1k3", finger:"left-pinky",mod: "altGr" },
  "#": { id: "r1k4", finger:"left-ring",mod: "altGr" },
  "{": { id: "r1k5", finger:"left-middle",mod: "altGr" },
  "[": { id: "r1k6",finger:"left-index", mod: "altGr" },
  "|": { id: "r1k7", finger:"left-index",mod: "altGr" },
  "`": { id: "r1k8",finger:"left-index", mod: "altGr" },
  "Backslash": { id: "r1k9",finger:"right-middle", mod: "altGr" },
  "@": { id: "r1k11",finger:"right-ring", mod: "altGr" },
  "]": { id: "r1k12",finger:"right-ring", mod: "altGr" },
  "}": { id: "r1k13",finger:"right-ring", mod: "altGr" },
  "€": { id: "r2k4",finger:"left-middle", mod: "altGr" },
  "¨": { id: "r2k12", finger:"right-pinky",mod: "altGr" },
  "^": { id: "r2k12", finger:"right-pinky",mod: "r4k1" },
 "$": { id: "r2k13",finger:"right-pinky"},
  "£": { id: "r2k13",finger:"right-pinky", mod: "r4k1" },
  "¤": { id: "r2k13",finger:"right-pinky", mod: "altGr" },
  "ù": { id: "r3k12", finger:"right-pinky" },
  "%": { id: "r3k12",finger:"right-pinky", mod: "r4k1" },
    "*": { id: "r3k13",finger:"right-pinky" },
    "µ": { id: "r3k13",finger:"right-pinky", mod: "r4k1" },
    "<": { id: "r4k2",finger:"left-pinky" },
    ">": { id: "r4k2",finger:"left-pinky", mod:"r4k13" },
    ",": { id: "r4k9",finger:"right-index" },
    "?": { id: "r4k9",finger:"right-index", mod: "r4k1" },
    ";": {id:"r4k10",finger:"right-middle"},
    ".":{id:"r4k10",finger:"right-middle", mod:"r4k1"},
    "slash":{id:"r4k11",finger:"right-ring", mod:"r4k1"},
    "!":{id:"r4k11",finger:"right-pinky"},
    "§":{id:"r4k11", finger:"right-pinky",mod:"r4k1"},

    //Others
    "esc":{id:"r1k1"},
    "back":{id:"r1k14"},
    "tab":{id:"r2k1"},
    "enter":{id:"r2k14"},
    "capLock":{id:"r3k1"},
    "r4k1":{id:"r4k1"},
    "r4k13":{id:"r4k13"},
    "altGr":{id:"r5k5"},
    "space":{id: "r5k4", finger:"thumb"}

};