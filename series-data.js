'use strict';
// Playlists from youtube.com/@abubakrzoud. Lesson counts and minutes are summed from the playlist videos (October 2026).
const SERIES = [
 {id:"mulk",group:"tafseer",title:"Tafseer Surat Al-Mulk",tag:"The Kingdom",lessons:5,minutes:372,playlist:"PLFyO0Qx1e9fuOzC9jASvxLey93t0-nJjF"},
 {id:"haaqqah",group:"tafseer",title:"Tafseer Surah Al-Haaqqah",tag:"The Inevitable Reality",lessons:5,minutes:359,playlist:"PLFyO0Qx1e9fsG-Afhz8pDSxGOBSOHlkt9"},
 {id:"qalam",group:"tafseer",title:"Tafseer Surah Al-Qalam",tag:"The Pen",lessons:5,minutes:347,playlist:"PLFyO0Qx1e9fvkhcljSvHF_Y1VXvMMusTa"},
 {id:"kahf",group:"tafseer",title:"Stories from Surat Al-Kahf",tag:"The Cave of Mercy",lessons:5,minutes:309,playlist:"PLFyO0Qx1e9fsrahY1g0rHurtz3IOjQFqi"},
 {id:"kursi",group:"tafseer",title:"Tafseer Ayat Al-Kursi",tag:"The Greatest Verse",lessons:4,minutes:294,playlist:"PLFyO0Qx1e9fvftFVvI29pg7fz656xkR-F"},
 {id:"shield",group:"subjects",title:"SHIELD: Morning & Evening Adhkar",tag:"Daily remembrance",lessons:30,minutes:1909,playlist:"PLFyO0Qx1e9fvQ9gxRhY9epOAs10NDcQ-m"},
 {id:"loving-allah",group:"subjects",title:"Loving Allah the Almighty",tag:"The heart",lessons:16,minutes:202,playlist:"PLFyO0Qx1e9fvs0kPXxSvf1aOsEH3mfcAc"},
 {id:"companions",group:"subjects",title:"The Story of the Companions",tag:"Seerah & history",lessons:5,minutes:333,playlist:"PLFyO0Qx1e9ft0_9cpDEvcvHfEmThDtplb"},
 {id:"hajj",group:"subjects",title:"The Purposes of Hajj & Umrah",tag:"Worship",lessons:11,minutes:582,playlist:"PLFyO0Qx1e9fsXYPGHJP4jKxeKBLler3N0"},
 {id:"khushoo",group:"subjects",title:"Khushoo in the Prayer",tag:"Fiqh of prayer",lessons:5,minutes:127,playlist:"PLFyO0Qx1e9ftxRisYNCFBDbitikDShS3w"},
 {id:"brotherhood",group:"subjects",title:"Brotherhood in Islam",tag:"Community",lessons:2,minutes:152,playlist:"PLFyO0Qx1e9ftiF2wfyQnWH6nORUnYIVu3"},
 {id:"thikr",group:"subjects",title:"In-depth Thikr Course",tag:"Remembrance",lessons:3,minutes:151,playlist:"PLFyO0Qx1e9fthfy5BOCH5NtsebqkEHgOA"},
 {id:"ramadan-2026",group:"seasons",title:"Ramadan Reminders 2026",tag:"Ramadan 1447",lessons:9,minutes:85,playlist:"PLFyO0Qx1e9fs00ntj4bxCgZH-aqNZZ7vA"},
 {id:"ramadan-2025",group:"seasons",title:"Ramadan Lectures & Reminders 2025",tag:"Ramadan 1446",lessons:14,minutes:345,playlist:"PLFyO0Qx1e9ftbGFOXU7_JRMEQOIrIf5ki"},
 {id:"dhul-hijjah",group:"seasons",title:"10 Days of Dhul Hijjah",tag:"Best days of the year",lessons:49,minutes:760,playlist:"PLFyO0Qx1e9fsjvtfq1Jgmevez9hg-6_5V"},
 {id:"reflections",group:"seasons",title:"Reflections from the Revelation",tag:"Ramadan series",lessons:10,minutes:138,playlist:"PLFyO0Qx1e9ftpTxygMe0j3efRO_Azld6W"},
 {id:"best-days",group:"seasons",title:"Best of Days Series",tag:"Dhul Hijjah",lessons:9,minutes:133,playlist:"PLFyO0Qx1e9fva5GFqOUIs34_29hAVaCe9"},
 {id:"learn-ramadan",group:"seasons",title:"What Do We Learn from Ramadan?",tag:"Worship as a way of life",lessons:5,minutes:171,playlist:"PLFyO0Qx1e9fu8ructpfAAXPJZBHjqWyyS"}
];
