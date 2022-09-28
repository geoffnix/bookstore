## bookstore

Sample React Native app

# Notes

I tried to build everything from scratch with core RN components.  The one exception was to use React-Navigation.  I wanted type safety, so I started with the TypeScript template.

I used a simple interface for the "model" object, but given more time that should be converted to a proper class with more validations when deserializing.

Most of the complexity is within `SearchListView`.  View, state management, and effect/logic are contained in this one class, which could grow cumbersome with more added features. This would be improved by adopting something like Redux, which is similar to design patterns I favor in iOS native apps.

Building the navigation structure in `Navigation` didn't feel as DRY as I would like.  With more time I would explore other options.

# Other features to add with more time
I did not have time to build out any tests.
I dealt with images in very simple way - when loading many async images I would prefer a system of progressively loading small, then medium, then large scale images to improve the user experience.  One could also prefetch the small version of the images once core api calls have been made.
