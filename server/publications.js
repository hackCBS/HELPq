// ---------------------------------------
// Publish Data
// ---------------------------------------

Meteor.publish("userData", getUserData);
Meteor.publish("allUsers", getAllUsers);
Meteor.publish("mentorsOnline", getMentorsOnline);

Meteor.publish("activeTickets", getActiveTickets);
Meteor.publish("allTickets", getAllTickets);
Meteor.publish("userTickets", getUserTickets);

Meteor.publish("allAnnouncements", getAllAnnouncements);

Meteor.publish("settings", getSettings);

// Get user data on yourself
function getUserData(){
  if (authorized.user(this.userId)) {
    return Meteor.users.find({_id: this.userId},
        {
          fields: {
            'services': 1,
            'profile': 1
          }
        });
  } else {
    this.ready();
  }
}

// Get all users
function getAllUsers(){
  if (authorized.admin(this.userId)) {
    return Meteor.users.find({},
        {
          fields: {
            'createdAt': 1,
            'services': 1,
            'profile': 1
          }
        });
  } else {
    this.ready();
  }
}

function getMentorsOnline(){
  if (authorized.user(this.userId)) {
    return Meteor.users.find({
      'profile.mentor': true,
      'status.online': true
    }, {
      fields: {
        'profile.name': 1,
        'profile.email': 1,
        'profile.phone': 1,
        'profile.mentor': 1,
        'profile.skills': 1,
        'status.idle': 1,
        'status.online': 1
      }
    })
  }
}

// Get all of the active tickets
function getActiveTickets(){
  if (authorized.user(this.userId)) {
    return Tickets.find(
        {
          status: {
            $in: ["OPEN", "CLAIMED"]
          }
        }, {
          sort: {
            timestamp: 1
          }
        });
  } else {
    this.ready();
  }
}

// Get all of the tickets
function getAllTickets(){
  if (authorized.admin(this.userId)){
    return Tickets.find({});
  }
}

// Get the tickets for the current user
function getUserTickets(){
  if (authorized.user(this.userId)){
    return Tickets.find({
      userId: this.userId
    })
  }
}

// Get all of the announcements
function getAllAnnouncements(){
  if (authorized.user(this.userId)){
    return Announcements.find({});
  }
}

function getSettings(){
  if (authorized.user(this.userId)){
    return Settings.find({});
  }
}