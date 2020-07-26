# Operator
This is a productivity tool that helps you get to the website you intend to get to with just one a couple of keystrokes. Think of it as a bookmark tool, but with hotkeys.

## Setup
1_ Clone the repo:
```
git clone https://github.com/mohkami/operator.git
```
2_ Go to the directory it has been cloned to:
```
cd operator
```

3_ Update the `src/default-values.json` file following the existing example there to add your keywords and their corresponding urls.

Now you can either use Docker to make things easier for you, or just run it as a server on your local machine.
### Using Docker (my recommendation):
4_ Build the image:
```
docker build --tag operator:1.0 .
```

4_ Create and run a container in the background using the image:
```
docker run --publish 3000:3000 --detach --name operator operator:1.0
```

### Using Yarn Start in local:
5_ Run the following command to start the server locally:
```
yarn start
```

### Usage
1_ Add a search engine to your chrome. For this, you need to go to the page that allows you to edit the search engines. Either right click on your url input and click on "Edit Search Engines..." or just paste this `chrome://settings/searchEngines` in your url.

2_ Click on the Add button on the page to add a new search engine to your chrome and input the following values:
![image](https://user-images.githubusercontent.com/4794780/88469389-1296ff00-cea6-11ea-899b-ffcd01699915.png)

3_ Now you just need to enter `o` in your url and press tab to see the following:
![image](https://user-images.githubusercontent.com/4794780/88469493-ec259380-cea6-11ea-8d26-138385db5e01.png)

4_ Now just give it the keyword you've already set in the `src/default-values.json` file. For example:
![image](https://user-images.githubusercontent.com/4794780/88469544-5a6a5600-cea7-11ea-8e41-f401b69f850b.png)

5_ This takes me to my Pull Requests page on Github.
