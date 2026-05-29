const calculateWinnings = (stakeAmount) => {
  const totalPool = Number(stakeAmount) * 2;

  const winnerAmount = totalPool * 0.75;

  const platformCommission = totalPool * 0.25;

  return {
    totalPool,
    winnerAmount,
    platformCommission
  };
};

export default calculateWinnings;