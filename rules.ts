import fs from "fs";
import { KarabinerRules } from "./types";
import { createHyperSubLayers, app, open, rectangle, shell } from "./utils";

const rules: KarabinerRules[] = [
    ...createHyperSubLayers({
        k: app("kitty"),
        j: app("safari"),
        b: app("brave browser"),
    }),
    // Define the Hyper key itself
    {
        description: "Hyper Key (⌃⌥⇧⌘)",
        manipulators: [
            {
                description: " -> Hyper Key",
                from: {
                    simultaneous: [
                        { key_code: "left_shift", },
                        { key_code: "right_shift", }
                    ],
                },
                to: [
                    {
                        set_variable: {
                            name: "hyper",
                            value: 1,
                        },
                    },
                ],
                to_after_key_up: [
                    {
                        set_variable: {
                            name: "hyper",
                            value: 0,
                        },
                    },
                ],
                type: "basic",
            },
        ],
    },
    {
        description: "Hyper Key (⌃⌥⇧⌘)",
        manipulators: [
            {
                description: "Tab-long -> Hyper Key",
                from: {
                    key_code: "tab"
                },
                to_if_alone: [
                    { key_code: "tab" }
                ],
                to: [
                    {
                        set_variable: {
                            name: "hyper",
                            value: 1,
                        },
                    },
                ],
                to_after_key_up: [
                    {
                        set_variable: {
                            name: "hyper",
                            value: 0,
                        },
                    },
                ],
                type: "basic",
            },
        ],
    },

    {
        description: "caps_lock -> ESC, left ctrl",
        manipulators: [
            {
                description: "caps_lock -> ESC, left ctrl",
                from: {
                    key_code: "caps_lock",
                    modifiers: {
                        optional: ["any"],
                    },
                },
                to: [
                    { key_code: "left_control" }
                ],
                to_if_alone: [
                    { key_code: "escape", },
                ],
                type: "basic",
            },
        ],
    },

];

fs.writeFileSync(
    "karabiner.json",
    JSON.stringify(
        {
            global: {
                show_in_menu_bar: false,
            },
            profiles: [
                {
                    name: "Default",
                    complex_modifications: {
                        rules,
                    },
                },
            ],
        },
        null,
        2
    )
);
