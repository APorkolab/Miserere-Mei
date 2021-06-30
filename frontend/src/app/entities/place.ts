export class Place {
    location: string;
    narrationZoneText: string;
    opponentName: string;
    decision1: string;
    decision2: string;
    decision3: string;
    decision4: string;
    sceneArtFilename: string;
    furtherLocation1: string;
    furtherLocation2: string;
    furtherLocation3: string;
    furtherLocation4: string;

    constructor(json: any) {
        if (json !== undefined && json != null) {
            this.location = json.location;
            this.narrationZoneText = json.narrationZoneText;
            this.opponentName = json.opponentName;
            this.decision1 = json.decision1;
            this.decision2 = json.decision2;
            this.decision3 = json.decision3;
            this.decision4 = json.decision4;
            this.sceneArtFilename = json.sceneArtFilename;
            this.furtherLocation1 = json.furtherLocation1;
            this.furtherLocation2 = json.furtherLocation2;
            this.furtherLocation3 = json.furtherLocation3;
            this.furtherLocation4 = json.furtherLocation4;
            }
    }
}
