<script>
    import Svg from "./Svg.svelte";
    export let title;

    let expanded = false;
</script>

<div class="popup card">
    <div class="top-section">
        <button
            class={`dropdown${expanded ? " expanded" : ""}`}
            on:click={() => {
                expanded = !expanded;
            }}
        >
            <h3>{title}</h3>
            <div class="arrow">
                <Svg name="expand_left" size="2rem" />
            </div>
        </button>
    </div>
    <div class={`expander${expanded ? " expanded" : ""}`}>
        <div class="content-wrapper">
            <div class="content">
                <slot />
            </div>
        </div>
    </div>
</div>

<style>
    .card {
        box-shadow: var(--shadow-down) var(--border-dark);
        border-radius: var(--br);
        padding: 2rem;
        width: 100%;
    }
    button.dropdown {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.25rem;
    }
    button.dropdown .arrow {
        transform: rotate(-90deg);
        transition: 0.5s;
    }
    button.dropdown.expanded .arrow {
        transform: rotate(90deg);
    }
    .expander {
        display: grid;
        grid-template-rows: 0fr;
        overflow: hidden;
        transition: grid-template-rows 0.5s;
    }
    .content-wrapper {
        min-height: 0;
        transition: visibility 0.5s;
        visibility: hidden;
    }
    .expander.expanded {
        grid-template-rows: 1fr;
    }
    .expander.expanded .content-wrapper {
        visibility: visible;
    }
    .content {
        padding-top: 2rem;
    }
    @media screen and (max-width: 400px) {
        .card {
            padding: 1.5rem;
        }
    }
</style>
