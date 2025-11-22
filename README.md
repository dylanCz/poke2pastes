# poke2pastes
A local state rework of pokepast.es. This works by encoding the team's data into the URL. Everytime a team is loaded it is decoded on the fly. 

This is not supposed to replace or even compete with pokepast.es, pokepast.es has far more features and support behind it. This was purely for my own fun to create an equivalent without needing to manage any state/databases.

The cons to this approach are fairly straightforward, primarily since each team has to be fully encoded into the URL, you end up with incredibly lengthy URLs. I'm going to spend a bit of time seeing if I can do any compression magic to reduce the length of the URLs via hashing and some other techniques but I can't promise anything.

Things I might work on in the future:
* Allowing pokemon to have nicknames (currently the sprite fetching methods will try and use these nicknames)
* Adding all alternate forms (ones I've caught so far are urshifu forms, therian forms and alolan forms, but likely applies to all alternate forms)
* Creating a default layout which allows more URL shortening as not all data will need encoded
* Nicer UI!
