export const insertIntoAuctions = async (auctionData) => {
    try {
      const response = await fetch('https://farm-simulator-auction-mod.vercel.app/api/auctions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(auctionData),
      });
  
      if (!response.ok) {
        throw new Error('Erro ao inserir leilão');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Erro:', error);
    }
  };
  