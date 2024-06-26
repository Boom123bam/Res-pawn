<script>
    let comparisonSection; // binds to html of 'how this works section'
    import Saos from "saos";
    import ChessBoard3d from "../components/ChessBoard3d.svelte";
    import ExpandableCard from "../components/ExpandableCard.svelte";
    import { browser } from "$app/environment";
</script>

<svelte:head>
    <!-- HTML Meta Tags -->
    <title>Res-pawn - Boost Pattern Recognition</title>
    <meta
        name="description"
        content="Chess puzzles optimized for pattern recognition"
    />
    <meta
        name="keywords"
        content="res-pawn, res pawn, chess tactics, chess puzzles, practice chess tactics"
    />

    <!-- Facebook Meta Tags -->
    <meta property="og:url" content="https://res-pawn.com" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Res-pawn - Boost Pattern Recognition" />
    <meta
        property="og:description"
        content="Chess puzzles optimized for pattern recognition"
    />
    <meta property="og:image" content="/images/thumbnail.png" />

    <!-- Twitter Meta Tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta property="twitter:domain" content="res-pawn.com" />
    <meta property="twitter:url" content="https://res-pawn.com" />
    <meta name="twitter:title" content="Res-pawn - Boost Pattern Recognition" />
    <meta
        name="twitter:description"
        content="Chess puzzles optimized for pattern recognition"
    />
    <meta name="twitter:image" content="/images/thumbnail.png" />
</svelte:head>

<section class="hero">
    <div class="content">
        <Saos animation={"slide-left 0.25s"}>
            <h1>Boost Pattern Recognition</h1>
        </Saos>
        <Saos
            animation={"slide-left 0.25s 0.1s forwards"}
            css_animation={"opacity:0;"}
        >
            <h5 class="subheading">
                Chess puzzles optimized for pattern recognition
            </h5>
        </Saos>
        <div class="buttons">
            <a href="/playlists" class="button-like primary shadow">
                play puzzles
            </a>
            <button
                on:click={() =>
                    comparisonSection.scrollIntoView({
                        block: "start",
                        behavior: "smooth",
                    })}
                class="ghost learn-more">learn more</button
            >
        </div>
    </div>
    <img src={`/images/hero.png`} class="bg" alt="hero" draggable="false" />
</section>
<section class="tiles-bg invert features" bind:this={comparisonSection}>
    <div class="features-container">
        <Saos
            animation={"slide-left 0.25s 0s both"}
            animation_out={"fade-out-down 0.25s both"}
            top={100}
        >
            <div class="bullet-box red">
                <ul>
                    <li>Skim through random puzzles and hope they stick</li>
                    <li><b>Slow</b> progress</li>
                </ul>
            </div>
        </Saos>
        <Saos
            animation={"slide-left 0.25s 0.1s both"}
            animation_out={"fade-out-down 0.25s both"}
            top={100}
        >
            <div class="bullet-box green">
                <ul>
                    <li><b>Repeat</b> and <b>master</b> patterns</li>
                    <li>
                        <b>Personalized</b> optimisation with spaced repetition
                    </li>
                    <li><b>Rapid</b> progress</li>
                </ul>
            </div>
        </Saos>
    </div>
</section>

<section class="how-it-works">
    <h2>How it works</h2>
    <div class="cards-container">
        <Saos
            animation={"scale 0.25s 0s both"}
            animation_out={"fade-out-down 0.25s 0.1s both"}
            top={100}
        >
            <div class="card first">
                <div class="black">
                    <h1>1</h1>
                    <!-- <p>Choose Your Challenge</p> -->
                </div>
                <p>Choose your current skill level.</p>
            </div>
        </Saos>
        <Saos
            animation={"scale 0.25s 0.1s both"}
            animation_out={"fade-out-down 0.25s both"}
            top={100}
        >
            <div class="card second">
                <div class="black">
                    <h1>2</h1>
                    <!-- <p>Solve Puzzles</p> -->
                </div>
                <p>Solve puzzles based on your level</p>
            </div>
        </Saos>
        <Saos
            animation={"scale 0.25s 0s both"}
            animation_out={"fade-out-down 0.25s 0.1s both"}
            top={100}
        >
            <div class="card third">
                <div class="black">
                    <h1>3</h1>
                    <!-- <p>Rate Your Experience</p> -->
                </div>
                <p>After each puzzle, tell the algorithm how hard it was.</p>
            </div>
        </Saos>
        <Saos
            animation={"scale 0.25s 0.1s both"}
            animation_out={"fade-out-down 0.25s both"}
            top={100}
        >
            <div class="card fourth">
                <div class="black">
                    <h1>4</h1>
                    <!-- <p>Spaced Repetition</p> -->
                </div>
                <p>The algorithm chooses your next puzzle.</p>
            </div>
        </Saos>
    </div>
    <div class="expandable-cards">
        <ExpandableCard title="What is Spaced Repetition?">
            <div class="dropdown-content">
                <img src="/images/SRgraph.png" alt="spaced repetition graph" />
                <span><i>graph of spaced repetition</i></span>

                <p>
                    Spaced Repetition is a learning technique that enhances
                    memory retention through review and repetition of material
                    over increasing intervals of time (shown by the graph
                    above). This makes learning more effective and efficient. It
                    is widely used in various educational contexts to maximize
                    the efficiency of study and training.
                </p>
                <p>
                    <a class="link color" href="/article/spaced-repetition"
                        >learn more about Spaced Repetition</a
                    >
                </p>
            </div>
        </ExpandableCard>
        <ExpandableCard title="How does Res-pawn use Spaced Repetition?">
            <div class="dropdown-content">
                <img
                    src="/images/feedback-system.png"
                    alt="spaced repetition graph"
                />
                <span><i>Res-pawn feedback system</i></span>
                <p>
                    After a puzzle is played, you will provide a rating on how
                    challenging the puzzle was (as shown by the image above).
                    Res-pawn uses this rating and runs a spaced repetition
                    algorithm to determine when the puzzle appears next. A
                    higher difficulty rating will result in sooner review time,
                    vice versa.
                </p>
            </div>
        </ExpandableCard>
    </div>
</section>

<section class="bottom-cta">
    <h1>Start playing now</h1>

    <Saos
        animation={"fade-in-up 0.25s cubic-bezier(0.175, 0.885, 0.320, 1.275) 0.1s both"}
    >
        <div class="chess-board-container">
            <ChessBoard3d />
        </div>
    </Saos>

    <Saos
        animation={"fade-in-up 0.25s cubic-bezier(0.175, 0.885, 0.320, 1.275) both"}
        animation_out={"fade-out-down 0.25s both"}
        top={100}
    >
        <a
            href="/playlists"
            class={`button-like browse shadow ${
                browser && document.body.classList.contains("dark")
                    ? "outline"
                    : "contrast"
            }`}><h3>Browse puzzles</h3></a
        >
    </Saos>
</section>

<style>
    .dropdown-content {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .dropdown-content span {
        font-size: 0.75rem;
        margin: 0.25rem 0;
    }
    .dropdown-content p {
        margin: 2rem 0 1rem;
        line-height: 150%;
    }
    .dropdown-content img {
        width: min(100%, 30rem);
        border: 1px solid var(--border-light);
        border-radius: var(--br-sm);
    }
    @keyframes -global-slide-left {
        0% {
            transform: translateX(-5rem) skewX(-5deg);
            opacity: 0;
        }
        100% {
            transform: translateX(0) skewX(0deg);
            opacity: 100;
        }
    }
    @keyframes -global-scale {
        0% {
            transform: scale(0.7) rotate(5deg);
            opacity: 0;
        }
        100% {
            transform: none;
            opacity: 100;
        }
    }
    @keyframes -global-fade-in-up {
        0% {
            opacity: 0;
            -webkit-transform: translateY(5rem);
            transform: translateY(5rem) scale(0.5);
        }
        100% {
            opacity: 1;
            -webkit-transform: none;
            transform: none;
        }
    }
    @keyframes -global-fade-out-down {
        0% {
            opacity: 1;
            -webkit-transform: none;
            transform: none;
        }
        100% {
            opacity: 0;
            -webkit-transform: translateY(5rem);
            transform: translateY(5rem);
        }
    }

    section.hero {
        width: min(75ch, 100% - 3rem);
        position: relative;
        min-height: calc(100vh - var(--nav-height));
        min-height: calc(100svh - var(--nav-height));
        /* min-height: 35rem; */
        /* overflow: hidden; */
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    section.hero img.bg {
        position: absolute;
        right: 0;
        top: calc(45% - 14rem);
        max-width: none;
        width: min(110vw + 15rem, 65rem);
        height: auto;
        object-fit: cover;
        object-position: top;
        z-index: -1;
    }
    :global(body.dark) section.hero img.bg {
        opacity: 0.75;
    }
    section.hero > .content {
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 1.5rem;
        padding-right: 15rem;
        margin-bottom: 3rem;
    }
    section.hero > .content .buttons {
        display: flex;
        gap: 0.5rem;
    }
    section.bottom-cta {
        margin-bottom: 0;
    }
    @media screen and (max-width: 700px) {
        section.hero img.bg {
            position: unset;
            width: 150%;
            object-fit: cover;
            align-self: flex-end;
            margin-bottom: 0.5rem;
        }

        section.hero > .content {
            padding-right: 0;
            top: 2.5rem;
            transform: none;
            margin-bottom: -7.5rem;
            margin-top: 1.5rem;
        }
        section.hero > .content .buttons {
            flex-direction: column;
            margin-top: 2rem;
        }
    }

    /* section.features */
    section.features {
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 6rem 0;
        --text: var(--beige);
    }
    .features-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        width: min(100%, 80rem);
        z-index: 1;
        padding-inline: 10%;
    }

    .features-container .feature h3 {
        margin-left: 2rem;
        width: max-content;
        position: relative;
    }

    .features-container .feature h3::before {
        content: "";
        width: 0.85rem;
        height: 0.85rem;
        position: absolute;
        top: 50%;
        transform: translate(-2rem, -50%) rotate(45deg);
    }

    .features-container .bullet-box {
        padding: var(--gap-lg);
        border-radius: var(--br-sm);
        padding-left: 2rem;
    }
    .features-container .bullet-box.red {
        background-color: #6d2d2d;
    }
    .features-container .bullet-box.red ul {
        list-style-type: "✘";
    }
    .features-container .bullet-box.green {
        background-color: #28642a;
    }
    .features-container .bullet-box.green ul {
        list-style-type: "✔";
    }
    .features-container .bullet-box ul {
        /* list-style-position: inside; */
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 1.5rem;
    }
    .features-container .bullet-box li {
        padding-left: 0.75rem;
    }

    /* section.how-it-works */
    section.how-it-works {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 5rem 0;
    }
    section.how-it-works h2 {
        background: var(--background-alt);
        padding: 1.25rem 8rem;
        border: 1px dashed var(--border-dark);
        border-bottom: 0;
        border-top-right-radius: var(--br);
        border-top-left-radius: var(--br);
    }
    .cards-container {
        --gap: var(--gap-lg);
        display: grid;
        grid-template-columns: 1fr 1fr;
        background-color: var(--blue-100);
        gap: var(--gap);
        padding: 1.25rem;
        border: 1px solid var(--border-light);
        border-radius: var(--br);
        margin-bottom: 2rem;
        pointer-events: none;
    }
    :global(body.dark) .cards-container {
        background-color: var(--gray-500);
    }

    .card {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-inline: var(--gap-lg);
        gap: 1rem;
        border-radius: var(--br);
        /* overflow: hidden; */
        aspect-ratio: 2;
        text-align: center;
        transition:
            transform 0.1s,
            box-shadow 0.1s,
            opacity 0.5s;
        border: 1px solid var(--border-dark);
        background-color: var(--background-alt);
        pointer-events: all;
        position: relative;
    }
    .card::after {
        position: absolute;
        content: "";
        inset: calc(-0.5 * var(--gap) - 1px);
    }

    .card .black {
        height: calc(100% - var(--gap-lg) * 2);
        aspect-ratio: 1;
        border-radius: var(--br-sm);
        gap: var(--gap-sm);
        background-color: var(--contrast);
        --text: var(--background-alt);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 0.5rem;
    }

    .third.card .black,
    .fourth.card .black {
        order: 1;
    }

    @media (hover: hover) {
        .cards-container:hover .card:not(:hover) {
            opacity: 0.5;
        }

        .card:hover {
            transform: translateY(calc(-1 * var(--shadow-size)));
            box-shadow: var(--shadow-down) var(--border-dark);
        }
    }

    .expandable-cards {
        display: flex;
        flex-direction: column;
        gap: var(--gap-lg);
    }
    @media screen and (max-width: 1000px) {
        .features-container {
            grid-template-columns: 1fr;
            gap: 2.5rem;
        }
    }
    @media screen and (max-width: 850px) {
        section.how-it-works h2 {
            padding: 0.75rem 1.5rem;
        }

        .cards-container {
            max-width: 25rem;
            grid-template-columns: 1fr;
            padding: 0.75rem;
        }

        .second.card .black {
            order: 1;
        }
        .third.card .black {
            order: 0;
        }
    }
    @media screen and (max-width: 400px) {
        .cards-container {
            padding: 0.5rem;
            --gap: 0.5rem;
        }
    }

    section.bottom-cta {
        background-color: var(--primary);
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding: 6rem 0;
        align-items: center;
        border-top: 1px solid var(--border-dark);
        text-align: center;
        padding-inline: 1.5rem;
        overflow: hidden;
    }

    section.bottom-cta h1 {
        margin-bottom: 1.5rem;
        --text: var(--background-alt);
    }

    section.bottom-cta .browse {
        padding: 1.3rem 2.5rem;
    }
    section.bottom-cta .browse:focus-visible {
        box-shadow: inset 0px 0px 0px 5px var(--white) !important;
        outline-color: transparent;
    }
</style>
