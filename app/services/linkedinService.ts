export async function fetchLinkedinProfile(profileName: string) {
  const url = "https://gw.magicalapi.com/profile-data";
  const headers = {
    "Content-Type": "application/json",
    "api-key": process.env.MAGICAL_API_KEY as string,
  };

  const initialResp = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({ profile_name: profileName }),
  });

  if (!initialResp.ok) {
    throw new Error(`Initial request failed: ${initialResp.status}`);
  }

  const initialData = await initialResp.json();
  const requestId = initialData?.data?.request_id;
  if (!requestId) {
    throw new Error("No request_id received from API");
  }

  let profileData = null;
  for (let i = 0; i < 10; i++) {
    const pollResp = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ request_id: requestId }),
    });

    if (!pollResp.ok) {
      throw new Error(`Polling request failed: ${pollResp.status}`);
    }

    const pollData = await pollResp.json();
    if (pollData?.data?.profile) {
      profileData = pollData.data.profile;
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }

  if (!profileData) {
    throw new Error("No se pudo obtener el perfil después de varios intentos");
  }
  return profileData;
}
