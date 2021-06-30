package hu.porkolab.miserere.service;

import mainModel.Place;

import java.io.IOException;
import java.util.Hashtable;

public interface PlaceService {
    Hashtable<String, Place> places = new Hashtable<>();
    Place getPlace(String placeName);
    Hashtable<String, Place> beolvasas() throws IOException;
    }