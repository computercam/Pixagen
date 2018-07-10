const state = {
  faq: [{
    title: 'How does it work?',
    paragraphs: ['This app generates a set of images using a keyword generator. The keywords generated are selected at random from a list topic categories. After a random set of images is generated, you can explore the ones you find interesting for related images and ideas. '
    ]
  },
  {
    title: 'Why use this app?',
    paragraphs: ['There are many image browsing and inspiration apps. What makes this one unique is that it can potentially bring you to things you would never find or think of on your own. Think of it as assisted brainstorming with random ideas you can explore and bring together.'
    ]
  },
  {
    title: 'Brief walkthrough',
    paragraphs: ['This app has 4 main sections, each with a specific purpose.',
      'The browser is the main section and is used to browse images. Here you can like and explore new image sets. When you reach the end, you\'re presented with a way to generate a new set.',
      'The generate section contains a list of methods you can use to generate an image set. Random keywords are the default generation method and will pick categories and keywords at random. Same categories will pick a new set of keywords from the same set of categories already being used. Keep keywords allows you to reuse an interesting keyword and generate a new one alongside it.',
      'The liked section contains every image you\'ve ever liked along with infomation and actions you can perform on the image. Removing a liked image from this page does not immediately remove it, this is to prevent accidential removal of liked images. When you leave and return from this page, your unliked image will be gone.',
      'The history section contains a list of past generated results that you can go back to. The list presents the most recent search at the top and the earliest search at the bottom. For the sake of performance, this list currently holds a maximum 40 items.'
    ]
  },
  {
    title: 'Exploring images',
    paragraphs: ['The most interesting feature of this app is the ability to explore related images. The explore feature tells google to find a set of related images using its smart indexing feature. To use the explore feature, tap the purple explore button next to an image.'
    ]
  },
  {
    title: 'Tips & tricks',
    paragraphs: ['The logo of this app will quickly generate a new set of images without having to scroll to the bottom of the browser or go to the "Generate" page.',
      'The most effective way to use this app is by scrolling through and liking images you find interesting first. After that, you can then go to the liked page and click the explore button to dive deeper. Using this method has the added bonus of being more thorough than immediately exploring every interesting image you find. '
    ]
  },
  {
    title: 'Settings',
    paragraphs: ['There are a number of settings you can use to make this app better suit your needs.',
      'Keywords: You can set the number of keywords the app will use to search for images. The lower the amount, the more predictable and stable the results. The higher the amount, the more random and unstable the results will be. Using a higher amount could be beneficial in some cases, such as finding more obscure images, however, this usually has the least desired effects.',
      'Single only: The keywords contained within the categories are sometimes more than one word. Take for instance "post-impressionism" in the Art Styles category. At times, these multi-word keywords can cause results to be undesirable. Single only will split multi-word keywords into individual words and pick one of the split words at random. This means that in Single only mode, our "post-impressionism" might yield "impressionism".',
      'Safe search (Experimental):  When checked, the app will try to filter out adult content by using google\'s filters. This works mostly well but is not perfect. Because the keywords are chosen at random and filters do not catch everything, it is still possible to be presented with some adult content.',
      'Blacklist: In blacklist, you can enter a set of keywords to filter out undesired results. Let\'s say for instance you want to find images relating to gemstones, but you keep getting cartoon characters from the popular Steven Universe series for results instead of gemstones; In blacklist, you could enter "Steven Universe" to filter out the cartoon characters. ',
      'Categories: These are the categories used when generating a keyword set. On this page, you can click the categories to either disable or enable them. This is useful if you want to attempt to narrow the results down to a specific type of theme of images.',
      'Unique categories: Normally when you generate a set of keywords, the app will try to avoid using the same category more than once to ensure the most unique results. At times, this can strain the possibility of finding certain images. Disabling this limitation will allow the app to reuse the same categories when generating a keyword set. Be aware that you may not notice the effects of this setting with a large number of categories enabled. For more noticeable effects, try enabling only a few categories.'
    ]
  }, {
    title: 'Caveats',
    paragraphs: ['This app is still in its very early beta and may have many bugs and or flaws. If you have any suggestions or problems, please provide feedback by going to the links provided on the about page.',
      'This app requires some amount of patience and attentiveness to get the most out of it. You may not immediately see the kind of images you find interesting, but if you look carefully and use the explore feature, you can end up in interesting places very quickly. I once ended up on a set of psychedelic geometric art from an initial set of results that were just textbook covers and line graphs.',
      'This app uses a custom created API that scrapes metadata from google images. As such, the images generated by this app are limited to only what Google has already indexed. In the future, this app may use additional APIs and databases to search for images.',
      'This app will only display the first 100 images per keyword/explore set. This is partly due to the way the app was programmed but also because endlessly scrolling the same set of images is not the best way to find new inspiration. There are plenty of apps that will give you a nearly endless supply of images to scroll through. This app is designed in a way that you can use it to act on your inspiration quickly without getting lost in infinity.',
      'This app currently uses a feature of web browsers called localStorage. Because of this, it is recommended that you save images you like as often as possible and take caution when deleting your history. In the future, we will allow users to log in and have their data saved in a database.',
      'This app\'s set of categories and keywords is still far from complete. In fact, the most difficult part of the app is the curation of keywords and categories. Because of this, just keep in mind that future versions will have a more robust and predictable way to generate genuinely interesting images more frequently.'
    ]
  }]
}

const getters = {
  getFaq (state) {
    return state.faq
  }
}

export default {
  state,
  getters
}