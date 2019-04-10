# KATA

##### TODO
  - Fix playing sound on miss
  - move engine to submodule
  - show typo'ed char
  - make rendering recursive
  - fix resetting BHV nodes
  - Add audio manager
  - Add option for romanji pronounciation
  - create audioEventListener
  - Add BHV MultiSelectorNode
  - Add pause option
  - add boxey tunnel shader
  - update background numchars
  - materialize chars at top
  - add atlas meta file atlas sheet generator


##### Generating a new atlas
1) Update the `data/json/chars.json` file
1) Run `$ grunt gen_atlas`
1) The script will: 
   - copy the file into `app/data/json/`
   - copy the tools into `app/tools/`
   - open a browser and runs the font_to_image script which will save the data into `../data/atlas/hiragana`
1) *Texturepacker task* runs
   - texturepacker command line tool which generates the meta data and atlas file
1) gen_atlas will copy the individual char images into app/tools/atlas/
1) It will also copy the metadata file
1) *Atlas creator* script is run
   - script will generate a new atlas and save it into `data/atlas`
