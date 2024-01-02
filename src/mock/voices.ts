type Voice = {
  name: string;
  country: string;
  voiceId: string;
  imageUri: string;
};

const voices: Voice[] = [
  {
    name: "Scarlett",
    country: "United States",
    voiceId: "en-US-ScarlettNeural",
    imageUri: "https://unrealspeech.com/images/avatar-mid-1b.jpg",
  },
  {
    name: "Will",
    country: "United States",
    voiceId: "en-US-WilltNeural",
    imageUri: "https://unrealspeech.com/images/avatar-mid-14.jpg",
  },
  {
    name: "Dan",
    country: "United States",
    voiceId: "en-US-DanNeural",
    imageUri: "https://unrealspeech.com/images/avatar-mid-6a.jpg",
  },
  {
    name: "Liv",
    country: "United States",
    voiceId: "en-US-LivNeural",
    imageUri: "https://unrealspeech.com/images/avatar-mid-11.jpg",
  },
  {
    name: "Amy",
    country: "United Kingdom",
    voiceId: "en-GB-AmyNeural",
    imageUri: "https://unrealspeech.com/images/avatar-mid-17.jpg",
  },
];

export default voices;
