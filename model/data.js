const Images = [
  {image: require('../assets/banners/accident.jpg')},
  {image: require('../assets/banners/ambulance.jpg')},
  {image: require('../assets/banners/heart-attack.jpg')},
  {image: require('../assets/banners/blood-donor.jpg')},
  {image: require('../assets/banners/medicine-store.jpg')},
];

 const data = [
  {
    id: '1',
    coordinate: {
      latitude: 22.6341137,
      longitude: 88.4497463,
    },
    title: 'Accident',
    name: 'accident_reported',
    description: `Get help immidiate for Accident.`,
    image: Images[0].image,
    rating: 4,
    reviews: 48,
    categories: ['Restaurant', 'Fastfood Center', 'Snacks Corner'],
  },
  {
    id: '2',
    coordinate: {
      latitude: 22.6293867,
      longitude: 88.4354486,
    },
    title: 'Call Nearest Ambulance',
    name: 'ambulance_request',
    description: `Request for near Ambulance.`,
    image: Images[1].image,
    rating: 4,
    reviews: 99,
    categories: ['Restaurant', 'Hotel', 'Dineout'],
  },
  {
    id: '3',
    coordinate: {
      latitude: 22.6345648,
      longitude: 88.4377279,
    },
    title: 'Heart Attack',
    name: 'heart_attack',
    description: `Connect Nearest Heart Clinic.`,
    image: Images[2].image,
    rating: 5,
    reviews: 102,
    categories: ['Restaurant', 'Fastfood Center', 'Snacks Corner'],
  },
  {
    id: '4',
    coordinate: {
      latitude: 22.6281662,
      longitude: 88.4410113,
    },
    title: 'Blood Donor',
    name: 'blood_donor',
    description: `Find Nearest Blood Doner.`,
    image: Images[3].image,
    rating: 3,
    reviews: 220,
    categories: ['Restaurant', 'Hotel', 'Dineout'],
  },
 
  {
    id: '5',
    coordinate: {
      latitude: 22.6292757,
      longitude: 88.444781,
    },
    title: 'Find Medicine Store',
    name: 'medicine_store',
    description: `Find near Medicine Store.`,
    image: Images[4].image,
    rating: 4,
    reviews: 178,
    categories: ['Restaurant', 'Hotel', 'Dineout'],
  }
];

 const service = [
  {
    id: '1',
    title: 'Accident Reported',
    name: 'accident_reported',
    rating: 4,
    reviews: 48,
    requestCount:100,
    description:"People need emergency help",
    image: Images[0].image
  },
  {
    id: '2',
    title: 'Ambulance Request',
    name: 'ambulance_request',
    reviews: 99,
    requestCount:200,
    description: 'Get instant Ambulance Service',
    image: Images[1].image

  },
  {
    id: '3',
    title: 'Heart Attack Emergency',
    name: 'heart_attack',
    rating: 5,
    reviews: 102,
    requestCount:300,
    description: 'Extrem Help needed',
    image: Images[2].image

  },
  {
    id: '4',
    title: 'Blood Donor Request',
    name: 'blood_donor',
    rating: 3,
    reviews: 220,
    requestCount:400,
    description: 'Get instance Blood Donor',
    image: Images[3].image

  }
];

export {data, service}