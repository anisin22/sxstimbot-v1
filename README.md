# sxstimbot-v1
Discord Bot for the guild SxStim, from the game ROTMG. Handles the basic guild interactions, the guild bank, and the guild waiting list. 

# Players Joining/Leaving
Sends message to a channel called #welcome-goodbye, you need a channel called this for this to work, you can change message in the code. Will not work if channel is not present. 

# Guild Bank
Uses firbase to store values. Various commands to update the guild bank and withdraw from it. 
You need a role called Member to be able to use the guild bank. 

# Waiting List
Two different waiting lists, 1 for VIP and 1 for normal. User just has to type +join <ROTMG IGN> and if they do not have the role VIP boi then they get added to the normal wait list and if they do then they get added to the VIP list. There are various commands to remove people and manually add people. It also changes their name to their ROTMG IGN. Also must have a channel called #waiting for the waiting list to show.

