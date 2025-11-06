graph TB
    %% CONTRAST COLORS: Texto negro, colores suaves de fondo
    classDef gateway fill:#B1D0E0,stroke:#333,stroke-width:2px,color:#111;
    classDef module fill:#C0E8C6,stroke:#333,stroke-width:1px,color:#111;
    classDef auth fill:#E3B1E0,stroke:#333,stroke-width:1px,color:#111;
    classDef adapter fill:#FFD6A5,stroke:#333,stroke-width:1px,color:#111;
    classDef client fill:#FFF,stroke:#333,stroke-width:1px,color:#111;

    subgraph Client Applications
        CLIENT[Client App]
        VENDOR[Vendor App]
    end

    subgraph Gateway Layer
        UG[User Gateway]
        VG[Vendor Gateway]
    end

    subgraph Core Modules
        subgraph Authentication
            AUTH[Auth Module]
            JWT[JWT Service]
            GOOGLE[Google Auth]
        end

        subgraph Business Modules
            UM[User Module]
            VM[Vendor Module]
            OM[Order Module]
            CM[Cart Module]
            RM[Restaurant Module]
        end

        subgraph Adapters Layer
            AD_PROD[Restaurant-Product Adapter]
            AD_RES[Restaurant-Info Adapter]
        end
    end

    %% Client connections
    CLIENT --> UG
    VENDOR --> VG

    %% Gateway connections
    UG --> UM
    UG --> OM
    UG --> CM
    UG --> RM
    VG --> VM
    VG --> OM
    VG --> RM

    %% Auth connections SOLO a User y Vendor
    UM --> AUTH
    VM --> AUTH
    AUTH --> JWT
    AUTH --> GOOGLE

    %% Adapters connections
    AD_PROD -- provee productos --> OM
    AD_PROD -- provee productos --> CM
    RM -- provee productos --> AD_PROD

    AD_RES -- provee información restaurante --> OM
    RM -- provee información restaurante --> AD_RES

    %% Adapters legend
    classDef adapterdesc fill:#FFD6A5,stroke:#FFF,stroke-width:0px,font-size:10px;

    class UG,VG gateway
    class UM,VM,OM,CM,RM module
    class AUTH,JWT,GOOGLE auth
    class AD_PROD,AD_RES adapter
    class CLIENT,VENDOR client
