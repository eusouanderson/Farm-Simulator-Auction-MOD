export const insertIntoAuctions = async (auctionData) => {
    try {
      const response = await fetch('http://localhost:5000/api/auctions', {
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
  