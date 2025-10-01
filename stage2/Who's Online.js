const whosOnline = (friends) => {
  if (friends.length === 0) {
    return {};
  }

  const result = {};

  friends.forEach((friend) => {
    if (friend.status === "offline") {
      result.offline = result.offline || [];
      result.offline.push(friend.username);
    } else if (friend.status === "online") {
      if (friend.lastActivity > 10) {
        result.away = result.away || [];
        result.away.push(friend.username);
      } else {
        result.online = result.online || [];
        result.online.push(friend.username);
      }
    }
  });

  return result;
};
