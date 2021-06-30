package hu.porkolab.miserere.service.impl;

import hu.porkolab.miserere.data.model.Leltar;
import hu.porkolab.miserere.data.model.XMLReading;
import hu.porkolab.miserere.service.PlaceService;
import mainModel.Place;
import mainModel.SuperFoe;
import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.JDOMException;
import org.jdom2.input.SAXBuilder;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.Hashtable;
import java.util.List;

@Service
public class PlaceServiceImpl implements PlaceService {

    private PlayerSetupImpl player = new PlayerSetupImpl();
    private Place place = new Place();
    private String elozoAllomas = "GameBeginning";
    private Leltar leltar = new Leltar();
    private SuperFoe opponent;
    //private FightSystem fight = new FightSystem();
    private XMLReading xmlReading = new XMLReading();
    private int valasztas;
    private Hashtable<String, Place> places = xmlReading.getPlaces();

    public Hashtable<String, Place> beolvasas() throws IOException {
        Hashtable<String, Place> places;

        {
            try {
                places = beolvasas();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
URL url = PlaceServiceImpl.class.getClassLoader().getResource("resource/local.xml");
        File forrasFile = null;
        try {
            forrasFile = new File(url.toURI());
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
        Hashtable<String, Place> placees = new Hashtable<>();
        SAXBuilder jdomBuilder = new SAXBuilder();
        try {
            Document jdomDocument = jdomBuilder.build(forrasFile);
            Element jdomRoot = jdomDocument.getRootElement();
            List<Element> childrens;
            childrens = jdomRoot.getChildren();
            for (int i = 0; i < childrens.size(); i++) {
                Element child = childrens.get(i);
                int size = child.getChildren().size();
                Place p = new Place();
                p.setLocation(child.getChild("location").getText());
                p.setNarrationZoneText(child.getChild("narrationZoneText").getText());
                p.setOpponentName(child.getChild("opponentName").getText());
                p.setDecision1(child.getChild("decision1").getText());
                p.setDecision2(child.getChild("decision2").getText());
                p.setDecision3(child.getChild("decision3").getText());
                p.setDecision4(child.getChild("decision4").getText());
                p.setSceneArtFilename(child.getChild("sceneArtFilename").getText());
                p.setFurtherLocation1(child.getChild("furtherLocation1").getText());
                p.setFurtherLocation2(child.getChild("furtherLocation2").getText());
                p.setFurtherLocation3(child.getChild("furtherLocation3").getText());
                p.setFurtherLocation4(child.getChild("furtherLocation4").getText());
                placees.put(p.getLocation(), p);
            }
        } catch (JDOMException je) {
            System.err.println(je.getMessage());
        }
        System.out.println("places = " + placees.size());
        return placees;
    }

    @Override
    public Place getPlace(String placeName) {
        Place place = new Place();
//        if (placeName == "protagonistStrike"){
//            opponent = new Monster_Madman();
//            FightServiceImpl fight = new FightServiceImpl();
//            fight.fight();
//        }
        place.setDecision1(getPlaces().get(placeName).getDecision1());
        place.setDecision2(getPlaces().get(placeName).getDecision2());
        place.setDecision3(getPlaces().get(placeName).getDecision3());
        place.setDecision4(getPlaces().get(placeName).getDecision4());
        place.setFurtherLocation1(getPlaces().get(placeName).getFurtherLocation1());
        place.setFurtherLocation2(getPlaces().get(placeName).getFurtherLocation2());
        place.setFurtherLocation3(getPlaces().get(placeName).getFurtherLocation3());
        place.setFurtherLocation4(getPlaces().get(placeName).getFurtherLocation4());
        place.setNarrationZoneText(getPlaces().get(placeName).getNarrationZoneText());
        place.setOpponentName(getPlaces().get(placeName).getOpponentName());
        place.setSceneArtFilename(getPlaces().get(placeName).getSceneArtFilename());
        place.setLocation(elozoAllomas);
        return place;
    }

    public Hashtable<String, Place> getPlaces() {
        return places;
    }

}

