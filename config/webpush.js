import webpush from "web-push";

const publicVapidKey = "BOjZeZcQjDEn4bRTgzYNBPu-8ylqLBgEjnNofCtxETxd1438fHsVixvtCjQkqrcxRMzkjEkfPgWij5FeXLvu_og";
const privateVapidKey = "KS6RBVRvHr10lP6L3AEboeOA3OfJ5KdzC434WrNc15w";

webpush.setVapidDetails(
  "mailto:nagarjunarjun711@gmail.com",
  publicVapidKey,
  privateVapidKey
);

export default webpush;
