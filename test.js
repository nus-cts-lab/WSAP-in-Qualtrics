// Scenarios for the experiment
var stimuli = [
  // ANXIETY items
  { stimulus: "The flight attendant announces a flight delay. There is a/an _____.", words: ["Aircraft maintenance", "Distancing himself"], labels: ["benign", "anxiety"] },
  { stimulus: "People laugh after something you said. You said something _____.", words: ["Funny", "Embarrassing"], labels: ["benign", "anxiety"] },
  { stimulus: "You have a big presentation tomorrow. You cannot sleep because you are _____.", words: ["Excited", "Unprepared"], labels: ["benign", "anxiety"] },
  { stimulus: "You finish last of everyone on a test. You are _____.", words: ["Cautious", "Stupid"], labels: ["benign", "anxiety"] },
  { stimulus: "Your supervisor asks to chat privately. You are up for a _____.", words: ["Promotion", "Scolding"], labels: ["benign", "anxiety"] },
  { stimulus: "A colleague mentions they heard a rumor about upcoming layoffs. You are certain that you will _____.", words: ["Stay", "Laid off"], labels: ["benign", "anxiety"] },
  { stimulus: "Your friend is not replying to your messages. Your friend is _____.", words: ["Occupied", "Upset"], labels: ["benign", "anxiety"] },
  { stimulus: "Your date is not here yet because of _____.", words: ["Traffic", "No-show"], labels: ["benign", "anxiety"] },
  { stimulus: "You are at a social networking event. Your body feels _____.", words: ["Relaxed", "Tense"], labels: ["benign", "anxiety"] },
  
  // DEPRESSION items
  { stimulus: "You wake up and get out of bed. You feel _____.", words: ["Energetic", "Lethargic"], labels: ["benign", "depression"] },
  { stimulus: "You just finished a major project. You feel _____.", words: ["Relieved", "Tired"], labels: ["benign", "depression"] },
  { stimulus: "Your parents hire a lawyer. They are getting a _____.", words: ["New business", "Divorce"], labels: ["benign", "depression"] },
  { stimulus: "You organize a year-end party for your old-time friends, but no one shows up at the door. The party is _____.", words: ["Delayed", "Boring"], labels: ["benign", "depression"] },
  { stimulus: "You get a new job. You are _____.", words: ["Qualified", "Unqualified"], labels: ["benign", "depression"] },
  { stimulus: "It's New Year 's Eve. You think about the year ahead of you, full of _____.", words: ["Hope", "Dread"], labels: ["benign", "depression"] },
  { stimulus: "You go to a place you visited as a child. Walking around makes you feel _____.", words: ["Reminiscent", "Tense"], labels: ["benign", "depression"] },
  { stimulus: "You bought your friend a birthday gift. When she opens it, she looks _____.", words: ["Excited", "Disappointed"], labels: ["benign", "depression"] },
  { stimulus: "You are lying on the beach. You feel _____.", words: ["Relaxed", "Stressed"], labels: ["benign", "depression"] },
  
  // POSITIVE items
  { stimulus: "A new coffee shop opened in your neighborhood. You visit the shop to _____.", words: ["Get coffee", "Relax"], labels: ["benign", "positive"] },
  { stimulus: "Paul was praised for being _____ when he created multiple excel sheets for a project.", words: ["Bold", "Meticulous"], labels: ["benign", "positive"] },
  { stimulus: "You finally meet your friends after a long time. You catch up over _____.", words: ["Lunch", "Dinner"], labels: ["benign", "positive"] },
  { stimulus: "You are exercising at a nearby park. You heard a loud panting noise behind you. It is a _____.", words: ["Dog", "Runner"], labels: ["benign", "positive"] },
  { stimulus: "You are posted to a separate office for work, and your colleague decides to follow you there. You think your colleague is _____.", words: ["Loyal", "Helpful"], labels: ["benign", "positive"] },
  { stimulus: "There is a sudden power outage in your house. It is caused by the _____.", words: ["Storm", "Maintenance work"], labels: ["benign", "positive"] },
  { stimulus: "Andrea is on a nature walk. Her mood is _____.", words: ["Tranquil", "Elevated"], labels: ["benign", "positive"] },
  { stimulus: "You receive a call from an unknown number. It turns out that it is your _____.", words: ["Long-lost friend", "Delivery order"], labels: ["benign", "positive"] },
  { stimulus: "You are entering a rollercoaster ride. You feel a sense of _____.", words: ["Adrenaline", "Excitement"], labels: ["benign", "positive"] }
];
shuffleArray(stimuli);