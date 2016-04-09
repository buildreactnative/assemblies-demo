const currentUser = {
  groupIds: ["b20a1741a2449955"],
  summary: 'React Native enables you to build world-class application experiences on native platforms using a consistent developer experience based on JavaScript and React. The focus of React Native is on developer efficiency across all the platforms you care about — learn once, write anywhere. Facebook uses React Native in multiple production apps and will continue investing in React Native.',
  firstName: 'Example',
  lastName: 'Account',
  avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/React.js_logo.svg/2000px-React.js_logo.svg.png',
  technologies: ['JavaScript', 'React Native'],
  username: 'example@example.com',
  id: 'ee721bcdcf3ab96d',
  location : {
  	lat: 40.7127837,
  	lng: -74.0059413,
  	city: {
  		long_name: "New York",
  		short_name: "New York",
  		types: [
  			"locality",
  			"political"
  		]
  	},
  	state: {
  		long_name: "New York",
  		short_name: "NY",
  		types: [
  			"administrative_area_level_1",
  			"political"
  		]
  	},
  	formattedAddress: "New York, NY, USA"
  }
};

let notifications = [];

let messages = [];

let userGroups = [];

let suggestedGroups = [];

let events = [];

module.exports = { currentUser, notifications, messages, userGroups, suggestedGroups, events };
