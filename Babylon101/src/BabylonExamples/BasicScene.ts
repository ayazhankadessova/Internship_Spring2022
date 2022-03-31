import {Scene, Engine, FreeCamera, Vector3, HemisphericLight, MeshBuilder} from "@babylonjs/core"

export class BasicScene {

    // provide a type for var-s
    scene: Scene;
    engine: Engine;

    // create constructor
    // parameter canvas
    // HTMLCanvasElement - type
    // make it private for constructor method
    constructor(private canvas:HTMLCanvasElement) { 
        // Engine need canvas 
        // true for anti-alliasing to smooth out jagged edges around 3D objects
        this.engine = new Engine(this.canvas, true);
        // Separate method for everything in our scene
        // Assign it to this.scene
        // CreateScene() method that returns a scene type w/ everything already attached 
        this.scene = this.CreateScene();

        // Ensure we are running the engine + rendering scene
        // Use arrow function for this
        // Loop is important when we are working w/ animations -> we want to get the freshest look 
        // of whatever we are rendering in that scene
        this.engine.runRenderLoop(()=>{
            this.scene.render();
        });
    }

    // provide type for what we are returning -> Scene
    CreateScene(): Scene {
        // local var to this method/Scene 
        // pass in Engine into that
        // Scene is a class, requires an Engine
        const scene = new Scene(this.engine);

        // create camera - eyes in our environment
        // FreeCamera from babylonjs/core - (name, starting point in Vector3 -want to be in the center, scene - attach to this.scene)
        const camera = new FreeCamera("camera", new Vector3(0, 1, -5), this.scene);

        // if we want to control camera w/ the mouse...
        camera.attachControl();

        // Camera is only gonna work if there's smth in our environment
        // Different types of light -> use Hemispheric light
        // needs name, direction poiting in bc doesn't matter where you place, but where you point!, scene 
        const hemiLight = new HemisphericLight(
            "hemiLight", 
            new Vector3(0, 1, 0), 
            this.scene);

        // By default Hemispheric light is too light, but we can adjust intensity of that light
        hemiLight.intensity = 0.5; // default = 1, so reduce by half

        // Now we need some actual 3D objects
        // Ground and sphere to display 3D objects
        // import MeshBuilder: doc https://doc.babylonjs.com/divingDeeper/mesh/creation/set/box#meshbuilder
        // Mesh in Babylon: In the 3D virtual world shapes are built from meshes, lots of triangular facets 
        // joined together, each facet made from three vertices. Babylon. js provides for the creation of predefined meshes, of your own custom meshes and for importing meshes created by 3D design software.
        
        // Ground: name, width & height, scene (optional)
        // starting point is 0,0,0 by default
        const ground = MeshBuilder.CreateGround(
            "ground", 
            {width:10, height:10}, 
            this.scene
        );

        // Create Sphere
        // needs name, diameter, scene
        const ball = MeshBuilder.CreateSphere(
            "ball", 
            {diameter: 1}, 
            this.scene
        );

        // Want ball that is above the ground, similar to camera
        // change position
        ball.position = new Vector3(0, 1, 0);
        // Another method: ball.position.y = 1, etc.

        return scene;

    }
}