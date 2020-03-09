export interface ICampaignType {
  id: string,
  title: string,
  description: string
};

export const ALL_CAMPAING_TYPES: ICampaignType[] = [
  { id: 'Influencer-Campaigns', title: 'Influencer Campaigns', description: 'get paid to post on social media' },
  { id: 'Explainer-Promotional-Videos', title: 'Explainer / Promotional Videos', description: 'shoot videos promoting a product or explaining how it works' },
  { id: 'Contests', title: 'Contests', description: 'post & win freebies' },
  { id: 'Causes', title: 'Causes', description: 'help your favorite non - profits raise awareness' },
  { id: 'Modelling', title: 'Modelling', description: 'pose with products(clothing, gadgets, at resorts etc)' },
  { id: 'Performances', title: 'Performances', description: 'for those with a talent to showcase to a live audience(singers, comedians, dancers)' },
  { id: 'Meme-Creations', title: 'Meme Creations', description: 'create funny memes given a subject' },
  { id: 'Design-Work', title: 'Design Work', description: 'painting / illustrations / graphic design etc' },
  { id: 'Copy-Writing', title: 'Copy - writing', description: 'write well ? this might be for you' },
  { id: 'Portrait-Photography', title: 'Portrait Photography', description: 'take pictures of people' },
  { id: 'Fashion-Photography', title: 'Fashion Photography', description: 'take pictures of people in with products' },
  { id: 'Location-Photography', title: 'Location Photography', description: 'take pictures of places' },
  { id: 'Videography', title: 'Videography', description: 'take videos of people, places, or products' },
  { id: 'Photo-Video-Editing', title: 'Photo / Video Editing', description: 'take a good photo / video, and make it great' },
  { id: 'Singing-Voice-over', title: 'Singing / Voice - over', description: 'lend your voice to create great videos' },
];

export const getCampaignFromId = (id: string): ICampaignType | undefined => {
  return ALL_CAMPAING_TYPES.find(campaign => campaign.id.toLowerCase() == id.toLowerCase())
}