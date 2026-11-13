import { createClient } from "@base44/sdk";
import { getAppParams } from "@/lib/app-params";

const { appId, token, functionsVersion, appBaseUrl } = getAppParams();

export const base44 = createClient({ 
  appId, 
  token: token ?? undefined, 
  functionsVersion, 
  serverUrl: typeof window !== 'undefined' ? "/api" : "", 
  appBaseUrl: typeof window !== 'undefined' ? window.location.origin : appBaseUrl 
});
