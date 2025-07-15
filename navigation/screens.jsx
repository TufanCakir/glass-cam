// navigation/screens.jsx

export const screens = [
  {
    name: "StartScreen",
    getComponent: () => require("../screens/StartScreen").default,
    title: "Start",
  },
  {
    name: "HomeScreen",
    getComponent: () => require("../screens/HomeScreen").default,
    title: "Home",
  },
  {
    name: "GlassCamScreen",
    getComponent: () => require("../screens/GlassCamScreen").default,
  },
  {
    name: "EmojiPickerScreen",
    getComponent: () => require("../screens/EmojiPickerScreen").default,
    title: "Emoji Picker",
  },
  {
    name: "TermsOfServiceScreen",
    getComponent: () => require("../screens/TermsOfServiceScreen").default,
    title: "Terms of Service",
  },
  {
    name: "JournalScreen",
    getComponent: () => require("../screens/JournalScreen").default,
    title: "Add",
  },
  {
    name: "ProfileScreen",
    getComponent: () => require("../screens/ProfileScreen").default,
    title: "Profile",
  },
  {
    name: "SettingsScreen",
    getComponent: () => require("../screens/SettingsScreen").default,
    title: "Settings",
  },
  {
    name: "TextEditorScreen",
    getComponent: () => require("../screens/TextEditorScreen").default,
    title: "Text Editor",
  },
  {
    name: "NotesScreen",
    getComponent: () => require("../screens/NotesScreen").default,
    title: "Notes",
  },
  {
    name: "TodoScreen",
    getComponent: () => require("../screens/TodoScreen").default,
    title: "Todo",
  },
  {
    name: "WebBrowserScreen",
    getComponent: () => require("../screens/WebBrowserScreen").default,
    title: "Web Browser",
  },
];
