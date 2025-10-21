export const postN8n = async (complitedOrder) => {
  await fetch(
    "https://5859225-ze277454.twc1.net/webhook/ff699e49-54bd-4551-ae99-942dc31d18c5",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        complitedOrder,
      }),
    }
  );
};

// test https://5859225-ze277454.twc1.net/webhook-test/ff699e49-54bd-4551-ae99-942dc31d18c5
// prod https://5859225-ze277454.twc1.net/webhook/ff699e49-54bd-4551-ae99-942dc31d18c5
