package hu.porkolab.miserere.resource;

import hu.porkolab.miserere.service.PlayerService;
import mainModel.Place;
import hu.porkolab.miserere.service.FightService;
import hu.porkolab.miserere.service.PlaceService;
import mainModel.Player;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/misere")
public class MiserereResource {
    @Autowired
    private FightService fightService;
    @Autowired
    private PlaceService placeService;
    @Autowired
    private PlayerService playerService;

    @GetMapping("/place/{location}")
    public ResponseEntity<Place> getPlace(@PathVariable("location") String locationName) {
        return ResponseEntity.ok(placeService.getPlace(locationName));
    }

    @GetMapping("/player")
    public ResponseEntity<Player> getPlayer() {
        return ResponseEntity.ok(playerService.getPlayer());
    }

    @GetMapping("/fight")
    public ResponseEntity<List<String>> getHarcUzenet() {
        return ResponseEntity.ok(fightService.getHarcUzenet());
    }
}
