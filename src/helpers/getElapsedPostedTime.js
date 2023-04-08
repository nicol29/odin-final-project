function getElapsedPostedTime (unformattedDate) {
  const timeDiff = Math.abs(new Date() - unformattedDate.toDate());
  const minutes = Math.ceil(timeDiff / (1000 * 60));

  if (minutes < 60) {
    return "• " + minutes + " m";
  } else if (minutes >= 60 && minutes < 1440) {
    return "• " + Math.floor(minutes / 60) + " h";
  } else if (minutes >= 1440 && minutes < 10080) {
    return "• " + Math.floor(minutes / 1440) + " d";
  } else if (minutes >= 10080 && minutes < 43800) {
    return "• " + Math.floor(minutes / 10080) + " w"; 
  } else if (minutes >= 43800 && minutes < 525600) {
    return "• " + Math.floor(minutes / 43800) + " m"; 
  } else if (minutes >= 525600) {
    return "• " + Math.floor(minutes / 525600) + " m"; 
  }
}

export default getElapsedPostedTime;