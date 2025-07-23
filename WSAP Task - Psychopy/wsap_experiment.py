#!/usr/bin/env python3
"""
Word Sentence Association Paradigm (WSAP) - PsychoPy Version
Converted from jsPsych/Qualtrics implementation, 23rd July 2025
"""

from psychopy import visual, core, event, data, logging, gui
import random
import os
import pandas as pd
from datetime import datetime

class WSAPExperiment:
    def __init__(self):
        # Experiment settings
        self.win = None
        self.clock = core.Clock()
        self.experiment_data = []
        
        # Display settings
        self.text_height = 0.06
        self.instruction_height = 0.04
        self.fixation_size = 0.15
        
        # Timing settings
        self.fixation_duration = 0.5
        self.word_timeout = 3.0  # 3 seconds instead of 1.5 for better usability
        self.post_trial_gap = 0.5
        
        # Practice stimuli
        self.practice_stimuli = [
            {
                "stimulus": "The waiter brought your ______ to the table.",
                "words": ["appetiser", "tiger"],
                "labels": ["practice0", "practice1"]
            },
            {
                "stimulus": "Micah was volunteering at an animal shelter. The dog he was feeding suddenly bit him. The dog was _____.",
                "words": ["angry", "frightened"],
                "labels": ["practice0", "practice1"]
            },
            {
                "stimulus": "An old man is reading the _____.",
                "words": ["newspaper", "table"],
                "labels": ["practice0", "practice1"]
            },
            {
                "stimulus": "You are feeling tired from three days of camping. When you get home, you _____.",
                "words": ["sleep", "shower"],
                "labels": ["practice0", "practice1"]
            },
            {
                "stimulus": "Yesterday, you hung a picture up on the _____.",
                "words": ["wall", "tree"],
                "labels": ["practice0", "practice1"]
            }
        ]
        
        # Main experiment stimuli
        self.stimuli = [
            {"stimulus": "You have made an appointment to see your doctor to discuss your test results. You think the results will probably show you are _____.", "words": ["fine", "ill"], "labels": ["benign", "health-threat"]},
            {"stimulus": "You take a pill every morning at breakfast. The pill is a _____.", "words": ["vitamin", "medicine"], "labels": ["benign", "health-threat"]},
            {"stimulus": "It is 10am on a Monday and you are still in bed. You are at home because you have a _____.", "words": ["holiday", "cold"], "labels": ["benign", "health-threat"]},
            {"stimulus": "You feel weak and your stomach is making noises. You are _____.", "words": ["hungry", "sick"], "labels": ["benign", "health-threat"]},
            {"stimulus": "You are lying on the couch. Your body is heavy and your eyes are closing. You are _____.", "words": ["tired", "unwell"], "labels": ["benign", "health-threat"]},
            {"stimulus": "You begin to breath heavily. Your chest is quickly going up and down. You are _____.", "words": ["exercising", "asthmatic"], "labels": ["benign", "health-threat"]},
            {"stimulus": "There are many people at the gathering. Your best friend's mother and father are crying. Your best friend _____.", "words": ["has died", "has married"], "labels": ["health-threat", "benign"]},
            {"stimulus": "The man's forehead is sweaty. His heart is pounding, and he is breathing deeply because of _____.", "words": ["heart attack", "running"], "labels": ["health-threat", "benign"]},
            {"stimulus": "John continues to cough heavily. He has had this problem for a while. This condition is sometimes accompanied by pain. His cough is caused by ____.", "words": ["smoking", "lung cancer"], "labels": ["benign", "health-threat"]},
            {"stimulus": "The film actor is nauseous and vomits frequently. Also, his responses to the words of the other actor are slow. He is _____.", "words": ["drunk", "poisoned"], "labels": ["benign", "health-threat"]},
            {"stimulus": "You see a woman on the street. It takes a lot of effort for her to cross the curb. It is difficult to cross the curb with a ______.", "words": ["baby stroller", "wheelchair"], "labels": ["benign", "health-threat"]},
            {"stimulus": "You fell while you were walking. When you stood up, you felt as if your knee was wet. Your knee was ____.", "words": ["muddy", "bloody"], "labels": ["benign", "health-threat"]},
            {"stimulus": "You are talking to a skier. He competed in various international competitions. In one of the matches, he broke his _____.", "words": ["record", "leg"], "labels": ["benign", "health-threat"]},
            {"stimulus": "You saw your old friend after a long time. Surprisingly, he is completely bald. He told you that his baldness is because of his ______.", "words": ["acting makeup", "chemotherapy"], "labels": ["benign", "health-threat"]},
            {"stimulus": "A woman is coming toward you, and she is trying to keep her balance. This is because walking with _____ is very difficult. ", "words": ["high heels", "a cane"], "labels": ["benign", "health-threat"]},
            {"stimulus": "Yesterday, you collided with a car while riding a bicycle. You cannot ride a bicycle anymore because you broke your _____ in the accident. ", "words": ["bike", "leg"], "labels": ["benign", "health-threat"]},
            {"stimulus": "You are feeling symptoms of a flu and you have gone to hospital for a COVID-19 diagnostic test. You will be meeting your doctor today to discuss the test results. You think the results will probably show you have tested _____.", "words": ["negative for COVID-19", "positive for COVID-19"], "labels": ["benign", "health-threat"]},
            {"stimulus": "You are in a restaurant and the person sitting at the table next to yours is having a runny nose. You believe he is _____.", "words": ["allergic", "infected"], "labels": ["benign", "health-threat"]},
            {"stimulus": "You went to visit a friend in hospital. When you entered the Accident and Emergency Department (A&E) you bumped into someone. This person is (a) _____.", "words": ["relative", "pneumonic"], "labels": ["benign", "health-threat"]},
            {"stimulus": "Your friend asks you out for dinner, but you suggest a postponement and explain that it is because of _____.", "words": ["unavailability", "epidemic"], "labels": ["benign", "health-threat"]},
            {"stimulus": "You feel an itch in your throat. This itch is due to a _____.", "words": ["chili pepper", "sore throat"], "labels": ["benign", "health-threat"]},
            {"stimulus": "Tracy started to feel itchy and noticed red spots on her arms. Tracy has _____.", "words": ["mosquito bites", "hives"], "labels": ["benign", "health-threat"]},
            {"stimulus": "You came home and noticed that your body feels very warm. This is due to the/a _____.", "words": ["weather", "fever"], "labels": ["benign", "health-threat"]},
            {"stimulus": "Celeste suddenly felt very cold. She needs a ____.", "words": ["jacket", "doctor"], "labels": ["benign", "health-threat"]},
            {"stimulus": "After coming back from the zoo, Isaac washed his hands thoroughly to rid himself of ______.", "words": ["mud", "germs"], "labels": ["benign", "health-threat"]},
            {"stimulus": "You hear a noise in the night. It is from a _____.", "words": ["dog", "robber"], "labels": ["benign", "anxiety"]},
            {"stimulus": "Your friend comments on your behaviour. She _____ of how you acted.", "words": ["approves", "disapproves"], "labels": ["benign", "anxiety"]},
            {"stimulus": "You have not seen your family in a while because of _____.", "words": ["travelling", "conflict"], "labels": ["benign", "anxiety"]},
            {"stimulus": "Your date is not here yet because of _____.", "words": ["traffic", "no-show"], "labels": ["benign", "anxiety"]},
            {"stimulus": "There is a change in your salary. You are getting a _____.", "words": ["raise", "pay cut"], "labels": ["benign", "anxiety"]},
            {"stimulus": "You finish last of everyone on a test. You are _____.", "words": ["cautious", "stupid"], "labels": ["benign", "anxiety"]},
            {"stimulus": "Your boss wants to meet you to _____ you.", "words": ["praise", "criticise"], "labels": ["benign", "anxiety"]},
            {"stimulus": "People laugh after something you said. You said something _____.", "words": ["funny", "embarrassing"], "labels": ["benign", "anxiety"]},
            {"stimulus": "A friend does not respond when you wave hello because she is _____.", "words": ["distracted", "mad"], "labels": ["benign", "anxiety"]},
            {"stimulus": "Your date has to leave early. Your date is _____.", "words": ["busy", "bored"], "labels": ["benign", "anxiety"]},
            {"stimulus": "You carry a tray of food to a party. You are _____.", "words": ["graceful", "clumsy"], "labels": ["benign", "anxiety"]},
            {"stimulus": "The instructor asked the class to form into groups. You are certain you will be picked _____.", "words": ["first", "last"], "labels": ["benign", "anxiety"]},
            {"stimulus": "Your friend is not replying to your messages. Your friend is _____.", "words": ["occupied", "upset"], "labels": ["benign", "anxiety"]},
            {"stimulus": "You have a big presentation tomorrow. You cannot sleep because you are _____.", "words": ["excited", "unprepared"], "labels": ["benign", "anxiety"]},
            {"stimulus": "You are at a social networking event. Your body feels _____.", "words": ["relaxed", "tense"], "labels": ["benign", "anxiety"]},
            {"stimulus": "You attend a party without knowing anyone but the birthday boy. You feel _____.", "words": ["ready", "anxious"], "labels": ["benign", "anxiety"]},
            {"stimulus": "You have just changed jobs. Your new colleagues _____ you.", "words": ["like", "dislike"], "labels": ["benign", "anxiety"]},
            {"stimulus": "The flight attendant announces a flight delay. There is a/an _____.", "words": ["aircraft maintenance", "bomb threat"], "labels": ["benign", "anxiety"]},
            {"stimulus": "You forgot about an important deadline. You feel _____.", "words": ["hopeful", "doomed"], "labels": ["benign", "anxiety"]},
            {"stimulus": "Your friend seems hesitant in sharing information with you. Your friend is _____.", "words": ["planning a surprise", "distancing himself"], "labels": ["benign", "anxiety"]},
            {"stimulus": "Your supervisor asks to chat privately. You are up for a _____.", "words": ["promotion", "scolding"], "labels": ["benign", "anxiety"]},
            {"stimulus": "You find a handwritten note on your doorstep. Your neighbour is _____ you.", "words": ["thanking", "reporting"], "labels": ["benign", "anxiety"]},
            {"stimulus": "You don't know how to answer a question in class. You feel _____.", "words": ["curious", "incompetent"], "labels": ["benign", "anxiety"]},
            {"stimulus": "A colleague mentions they heard a rumor about upcoming layoffs. You are certain that you will _____.", "words": ["stay", "be laid off"], "labels": ["benign", "anxiety"]},
            {"stimulus": "You give a speech at your friend's wedding. When you have finished, you observe the audience's reaction. They are _____.", "words": ["smiling", "frowning"], "labels": ["benign", "anxiety"]},
            {"stimulus": "You see yourself in the mirror in the morning. You look _____.", "words": ["sleepy", "horrible"], "labels": ["benign", "dysphoric"]},
            {"stimulus": "You are lying on the beach. You feel _____.", "words": ["relaxed", "stressed"], "labels": ["benign", "dysphoric"]},
            {"stimulus": "Your parents hire a lawyer. They are getting a _____.", "words": ["new business", "divorce"], "labels": ["benign", "dysphoric"]},
            {"stimulus": "Somebody is asking you for directions. You _____.", "words": ["help", "avoid"], "labels": ["benign", "dysphoric"]},
            {"stimulus": "There is a moment of silence during a conversation. You find this _____.", "words": ["natural", "embarrassing"], "labels": ["benign", "dysphoric"]},
            {"stimulus": "Your new job has changed your life for the _____.", "words": ["better", "worse"], "labels": ["benign", "dysphoric"]},
            {"stimulus": "Your partner is not home yet. He/she is _____.", "words": ["delayed", "cheating"], "labels": ["benign", "dysphoric"]},
            {"stimulus": "You are thinking about your future, feeling _____.", "words": ["enthusiastic", "worried"], "labels": ["benign", "dysphoric"]},
            {"stimulus": "You get a new job. You are _____.", "words": ["qualified", "unqualified"], "labels": ["benign", "dysphoric"]},
            {"stimulus": "People always tell you to smile. You are _____.", "words": ["loved", "defective"], "labels": ["benign", "dysphoric"]},
            {"stimulus": "Your grades are starting to drop because you are a _____.", "words": ["caretaker", "failure"], "labels": ["benign", "dysphoric"]},
            {"stimulus": "A neighbour approaches you, frowning. He is _____.", "words": ["concerned", "angry"], "labels": ["benign", "dysphoric"]},
            {"stimulus": "You bought your friend a birthday gift. When she opens it, she looks _____.", "words": ["excited", "disappointed"], "labels": ["benign", "dysphoric"]},
            {"stimulus": "You wake up and get out of bed. You feel _____.", "words": ["energetic", "lethargic"], "labels": ["benign", "dysphoric"]},
            {"stimulus": "You go to a place you visited as a child. Walking around makes you feel _____.", "words": ["reminiscent ", "tense"], "labels": ["benign", "dysphoric"]},
            {"stimulus": "You give a speech at your friend's wedding. When you have finished, you observe the audience's reaction. They are _____.", "words": ["smiling", "frowning"], "labels": ["benign", "dysphoric"]},
            {"stimulus": "You have recently taken an important exam. Your results arrive with an unexpected letter of explanation about your grade. You did exceptionally _____.", "words": ["well", "poorly"], "labels": ["benign", "dysphoric"]},
            {"stimulus": "You are sitting on the beach. You look up to notice the weather really beginning to change. There is a _____.", "words": ["sunset", "thunderstorm"], "labels": ["benign", "dysphoric"]},
            {"stimulus": "It's New Year 's Eve. You think about the year ahead of you, full of _____.", "words": ["hope", "dread"], "labels": ["benign", "dysphoric"]},
            {"stimulus": "You organise a year-end party for your old-time friends, but no one shows up at the door. The party is _____.", "words": ["delayed", "boring"], "labels": ["benign", "dysphoric"]},
            {"stimulus": "You just finished a major project. You feel _____.", "words": ["relieved", "tired"], "labels": ["benign", "dysphoric"]},
            {"stimulus": "You used to regularly attend a weekly pub quiz with your friends but no longer want to. This is because you are _____.", "words": ["busy", "not interested"], "labels": ["benign", "dysphoric"]},
            {"stimulus": "Your friend asked you to help them run an errand and you agreed. However, you forgot about it throughout the week. You feel _____.", "words": ["regretful", "useless"], "labels": ["benign", "dysphoric"]},
            {"stimulus": "You are cooking and accidentally burned a dish. You decide to _____.", "words": ["try again", "stop"], "labels": ["benign", "dysphoric"]},
            {"stimulus": "You are up for an important evaluation. You predict that you will _____.", "words": ["pass", "fail"], "labels": ["benign", "dysphoric"]},
            {"stimulus": "You are on holiday. When you arrived at the hotel, you feel a sense of _____.", "words": ["excitement", "calm"], "labels": ["benign", "positive"]},
            {"stimulus": "Micah was waiting for his date at the cafe and wants to make a good impression. He sprays _____.", "words": ["breath spray", "cologne"], "labels": ["benign", "positive"]},
            {"stimulus": "Christmas is around the corner and you have to attend a family _____.", "words": ["picnic", "gathering"], "labels": ["benign", "positive"]},
            {"stimulus": "After showering, you feel _____.", "words": ["refreshed", "wet"], "labels": ["benign", "positive"]},
            {"stimulus": "You are exercising at a nearby park. You heard a loud panting noise behind you. It is a _____.", "words": ["dog", "runner"], "labels": ["benign", "positive"]},
            {"stimulus": "On the way home, it starts to rain. You reach for your _____.", "words": ["umbrella", "poncho"], "labels": ["benign", "positive"]},
            {"stimulus": "You play music in the car but no sound comes out. Your phone is _____.", "words": ["dead", "not plugged in"], "labels": ["benign", "positive"]},
            {"stimulus": "You finally meet your friends after a long time. You catch up over _____.", "words": ["lunch", "dinner"], "labels": ["benign", "positive"]},
            {"stimulus": "Andrea is on a nature walk. Her mood is _____.", "words": ["tranquil", "elevated"], "labels": ["benign", "positive"]},
            {"stimulus": "Reuben is at the start line of a race. He aims for the _____.", "words": ["finish line", "last hurdle"], "labels": ["benign", "positive"]},
            {"stimulus": "You are entering a rollercoaster ride. You feel a sense of _____.", "words": ["adrenaline", "excitement"], "labels": ["benign", "positive"]},
            {"stimulus": "You are posted to a separate office for work, and your colleague decides to follow you there. You think your colleague is _____.", "words": ["loyal", "helpful"], "labels": ["benign", "positive"]},
            {"stimulus": "You receive a call from an unknown number. It turns out that it is your _____.", "words": ["long-lost friend", "delivery order"], "labels": ["benign", "positive"]},
            {"stimulus": "Timothy find a lost wallet in a restaurant. He calls the _____.", "words": ["waiter", "police"], "labels": ["benign", "positive"]},
            {"stimulus": "There is a sudden power outage in your house. It is caused by the _____.", "words": ["storm", "maintenance work"], "labels": ["benign", "positive"]},
            {"stimulus": "Adam is running for the bus. The bus driver sees him and _____.", "words": ["nods", "waits"], "labels": ["benign", "positive"]},
            {"stimulus": "Ashley noticed that her garden is overgrown, and is attracting many _____.", "words": ["butterflies", "bees"], "labels": ["benign", "positive"]},
            {"stimulus": "A new coffee shop opened in your neighborhood. You visit the shop to _____.", "words": ["get coffee", "relax"], "labels": ["benign", "positive"]},
            {"stimulus": "You noticed a dent in you car. You think that it must have been caused by a/an _____.", "words": ["animal", "tree branch"], "labels": ["benign", "positive"]},
            {"stimulus": "The doorbell rings but you are not expecting anyone. You opened the door and it is a _____.", "words": ["girl scout", "real estate agent"], "labels": ["benign", "positive"]},
            {"stimulus": "Samuel bumped into a _____ at the petrol station.", "words": ["friend", "relative"], "labels": ["benign", "positive"]},
            {"stimulus": "Teachers commented that you were an _____ student growing up.", "words": ["inquisitive", "responsible"], "labels": ["benign", "positive"]},
            {"stimulus": "Hannah recently won a lucky draw and decides to donate the money to charity. Her peers say that she is _____.", "words": ["passionate", "philanthropic"], "labels": ["benign", "positive"]},
            {"stimulus": "Paul was praised for being _____ when he created multiple excel sheets for a project.", "words": ["bold", "meticulous"], "labels": ["benign", "positive"]},
            {"stimulus": "Jordan is always ready to comfort a friend in distress. Jordan is _____.", "words": ["popular ", "sensitive"], "labels": ["benign", "positive"]}
        ]
        
    def setup_window(self):
        """Setup the PsychoPy window"""
        self.win = visual.Window(
            size=[1024, 768],
            fullscr=True,
            screen=0,
            winType='pyglet',
            allowGUI=False,
            allowStencil=False,
            monitor='testMonitor',
            color=[0, 0, 0],
            colorSpace='rgb',
            blendMode='avg',
            useFBO=True,
            units='height'
        )
        
    def show_instructions(self, practice=True):
        """Show experiment instructions"""
        if practice:
            instruction_text = """You will now proceed to the Word Sentence Association Paradigm (WSAP) Task.

Instructions

In this task, a fixation cross ('+') will appear for 0.5 seconds, indicating the start of a trial.

After 0.5 seconds is up, you will be presented with a sentence. Each sentence will be in a fill-in-the-blank format, like such:

I am feeling tired. I must be _____.

Please press the SPACEBAR after you have finished reading the sentence. Thereafter, you will be presented with two words below the sentence. Your job is to complete the sentence with the word of your choice, as soon as possible.

Use the "F" or the "J" keys on your keyboard to indicate the words. Use the "F" key to indicate the word on the left; use the "J" key to indicate the word on the right. The word options will only appear for 3 seconds before the next trial begins.

There will be 5 practice trials before the main task begins. 

Press F or J to proceed."""
        else:
            instruction_text = """You have completed the practice trials, and will now proceed to the actual Word Sentence Association Paradigm (WSAP) Task.

Instructions

In this task, a fixation cross ('+') will appear for 0.5 seconds, indicating the start of a trial.

After 0.5 seconds is up, you will be presented with a sentence. Each sentence will be in a fill-in-the-blank format, like such:

I am feeling tired. I must be _____.

Please press the SPACEBAR after you have finished reading the sentence. Thereafter, you will be presented with two words below the sentence. Your job is to complete the sentence with the word of your choice, as soon as possible.

Use the "F" or the "J" keys on your keyboard to indicate the words. Use the "F" key to indicate the word on the left; use the "J" key to indicate the word on the right. The word options will only appear for 3 seconds before the next trial begins.

Please complete all 100 trials. This task is estimated to take 12 minutes. 

Press F or J to proceed."""
        
        instruction_stim = visual.TextStim(
            win=self.win,
            text=instruction_text,
            height=self.instruction_height,
            color='white',
            wrapWidth=1.8
        )
        
        instruction_stim.draw()
        self.win.flip()
        
        # Wait for F or J key press
        keys = event.waitKeys(keyList=['f', 'j', 'escape'])
        if 'escape' in keys:
            core.quit()
    
    def show_fixation(self):
        """Show fixation cross"""
        fixation = visual.TextStim(
            win=self.win,
            text='+',
            height=self.fixation_size,
            color='white',
            bold=True
        )
        
        fixation.draw()
        self.win.flip()
        core.wait(self.fixation_duration)
        core.wait(self.post_trial_gap)
    
    def show_sentence(self, sentence):
        """Show sentence and wait for spacebar"""
        sentence_stim = visual.TextStim(
            win=self.win,
            text=sentence,
            height=self.text_height,
            color='white',
            wrapWidth=1.8,
            bold=True
        )
        
        sentence_stim.draw()
        self.win.flip()
        
        # Wait for spacebar
        keys = event.waitKeys(keyList=['space', 'escape'])
        if 'escape' in keys:
            core.quit()
    
    def show_words_and_get_response(self, words, labels, is_practice=False):
        """Show two words and get participant response"""
        # Randomize word positions
        idx_left = random.randint(0, 1)
        idx_right = 1 - idx_left
        
        left_word = words[idx_left]
        right_word = words[idx_right]
        
        # Create text stimuli
        left_stim = visual.TextStim(
            win=self.win,
            text=left_word,
            height=self.text_height,
            color='white',
            pos=(-0.4, 0),
            bold=True
        )
        
        right_stim = visual.TextStim(
            win=self.win,
            text=right_word,
            height=self.text_height,
            color='white',
            pos=(0.4, 0),
            bold=True
        )
        
        # Show words
        left_stim.draw()
        right_stim.draw()
        self.win.flip()
        
        # Record timing
        response_clock = core.Clock()
        
        # Wait for response
        keys = event.waitKeys(
            maxWait=self.word_timeout,
            keyList=['f', 'j', 'escape'],
            timeStamped=response_clock
        )
        
        if keys:
            key, rt = keys[0]
            if key == 'escape':
                core.quit()
        else:
            key, rt = None, None
        
        # Determine valence based on response
        if key == 'f':
            chosen_word = left_word
            valence = labels[idx_left]
        elif key == 'j':
            chosen_word = right_word
            valence = labels[idx_right]
        else:
            chosen_word = ""
            valence = ""
        
        # Wait for remainder of trial duration
        core.wait(self.post_trial_gap)
        
        return {
            'response': key,
            'rt': rt,
            'valence': valence,
            'chosen_word': chosen_word,
            'left_word': left_word,
            'right_word': right_word,
            'idx_left': idx_left
        }
    
    def run_trial(self, stimulus_data, is_practice=False):
        """Run a single trial"""
        # Show fixation
        self.show_fixation()
        
        # Show sentence
        self.show_sentence(stimulus_data['stimulus'])
        
        # Show words and get response
        response_data = self.show_words_and_get_response(
            stimulus_data['words'],
            stimulus_data['labels'],
            is_practice
        )
        
        # Compile trial data
        trial_data = {
            'stimulus': stimulus_data['stimulus'],
            'words': str(stimulus_data['words']),
            'labels': str(stimulus_data['labels']),
            'response': response_data['response'],
            'rt': response_data['rt'],
            'valence': response_data['valence'],
            'chosen_word': response_data['chosen_word'],
            'left_word': response_data['left_word'],
            'right_word': response_data['right_word'],
            'idx_left': response_data['idx_left'],
            'is_practice': is_practice,
            'timestamp': datetime.now().isoformat()
        }
        
        return trial_data
    
    def run_practice(self):
        """Run practice trials"""
        print("Starting practice trials...")
        
        # Shuffle practice stimuli
        practice_trials = self.practice_stimuli.copy()
        random.shuffle(practice_trials)
        
        for i, stimulus in enumerate(practice_trials):
            print(f"Practice trial {i+1}/{len(practice_trials)}")
            trial_data = self.run_trial(stimulus, is_practice=True)
            self.experiment_data.append(trial_data)
    
    def run_experiment(self):
        """Run main experiment trials"""
        print("Starting main experiment...")
        
        # Shuffle main stimuli
        experiment_trials = self.stimuli.copy()
        random.shuffle(experiment_trials)
        
        for i, stimulus in enumerate(experiment_trials):
            print(f"Main trial {i+1}/{len(experiment_trials)}")
            trial_data = self.run_trial(stimulus, is_practice=False)
            self.experiment_data.append(trial_data)
    
    def show_debriefing(self):
        """Show debriefing message"""
        debrief_text = """You have completed the Word Sentence Association Paradigm (WSAP) Task.

Press the spacebar key to exit."""
        
        debrief_stim = visual.TextStim(
            win=self.win,
            text=debrief_text,
            height=self.text_height,
            color='white',
            wrapWidth=1.8
        )
        
        debrief_stim.draw()
        self.win.flip()
        
        # Wait for spacebar
        keys = event.waitKeys(keyList=['space', 'escape'])
        if 'escape' in keys:
            core.quit()
    
    def save_data(self, participant_id):
        """Save experiment data to CSV"""
        if not self.experiment_data:
            print("No data to save!")
            return
            
        # Create data directory if it doesn't exist
        if not os.path.exists('data'):
            os.makedirs('data')
        
        # Create DataFrame
        df = pd.DataFrame(self.experiment_data)
        
        # Generate filename with timestamp
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"data/wsap_data_{participant_id}_{timestamp}.csv"
        
        # Save to CSV
        df.to_csv(filename, index=False)
        print(f"Data saved to: {filename}")
        
        # Also save summary statistics
        main_trials = df[df['is_practice'] == False]
        if len(main_trials) > 0:
            summary_stats = {
                'participant_id': participant_id,
                'total_trials': len(main_trials),
                'completed_trials': len(main_trials[main_trials['response'].notna()]),
                'mean_rt': main_trials['rt'].mean() if main_trials['rt'].notna().any() else None,
                'benign_responses': len(main_trials[main_trials['valence'] == 'benign']),
                'threat_responses': len(main_trials[main_trials['valence'].str.contains('threat|anxiety|dysphoric', na=False)]),
                'positive_responses': len(main_trials[main_trials['valence'] == 'positive']),
                'timestamp': timestamp
            }
            
            summary_filename = f"data/wsap_summary_{participant_id}_{timestamp}.csv"
            pd.DataFrame([summary_stats]).to_csv(summary_filename, index=False)
            print(f"Summary saved to: {summary_filename}")
    
    def run(self):
        """Run the complete experiment"""
        try:
            # Get participant info
            info_dlg = gui.Dlg(title="WSAP Experiment")
            info_dlg.addField('Participant ID:')
            info_dlg.addField('Age:')
            info_dlg.addField('Gender:', choices=['Male', 'Female', 'Other', 'Prefer not to say'])
            info_data = info_dlg.show()
            
            if not info_dlg.OK:
                core.quit()
            
            participant_id = info_data[0] if info_data[0] else "unknown"
            
            # Setup experiment
            self.setup_window()
            
            # Show instructions for practice
            self.show_instructions(practice=True)
            
            # Run practice trials
            self.run_practice()
            
            # Show instructions for main experiment
            self.show_instructions(practice=False)
            
            # Run main experiment
            self.run_experiment()
            
            # Show debriefing
            self.show_debriefing()
            
            # Save data
            self.save_data(participant_id)
            
        except Exception as e:
            print(f"Error running experiment: {e}")
            
        finally:
            # Clean up
            if self.win:
                self.win.close()
            core.quit()


def main():
    """Main function to run the experiment"""
    # Set up logging
    logging.console.setLevel(logging.WARNING)
    
    # Create and run experiment
    experiment = WSAPExperiment()
    experiment.run()


if __name__ == '__mai