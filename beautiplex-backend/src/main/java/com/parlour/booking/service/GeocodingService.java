package com.parlour.booking.service;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Service
public class GeocodingService {

    private static final Logger logger = LoggerFactory.getLogger(GeocodingService.class);
    private static final String GEOCODING_URL = "https://nominatim.openstreetmap.org/search?q=%s&format=json&limit=1";

    public double[] getLatLongFromAddress(String address) {
        try {
            String url = String.format(GEOCODING_URL, address.replace(" ", "+"));
            RestTemplate restTemplate = new RestTemplate();
            String response = restTemplate.getForObject(url, String.class);

            logger.info("Geocoding API Response: {}", response);

            if (response == null || response.isEmpty()) {
                logger.error("Empty response from geocoding API");
                return null;
            }

            JSONArray jsonArray = new JSONArray(response);
            if (jsonArray.length() == 0) {
                logger.error("No results found for the given location: {}", address);
                return null;
            }

            JSONObject location = jsonArray.getJSONObject(0);
            double latitude = Double.parseDouble(location.getString("lat"));
            double longitude = Double.parseDouble(location.getString("lon"));

            logger.info("Latitude: {}, Longitude: {}", latitude, longitude);
            return new double[]{latitude, longitude};

        } catch (RestClientException e) {
            logger.error("Error communicating with geocoding API: {}", e.getMessage());
            return null;
        } catch (JSONException e) {
            logger.error("Error parsing geocoding API response: {}", e.getMessage());
            return null;
        } catch (Exception e) {
            logger.error("An unexpected error occurred during geocoding: {}", e.getMessage());
            return null;
        }
    }
}
