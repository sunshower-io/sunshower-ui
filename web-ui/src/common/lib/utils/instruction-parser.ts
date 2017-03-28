

export class InstructionParser {

    private instructions = [
        "ARG",
        "ENV",
        "EXPOSE",
        "VOLUME"
    ];

    public parseInstructionSet(commands) {
        let parsedInstructions: Array<Instruction> = [];

        for (let cmd of commands) {
            if (this.contains(cmd.name)) {
                console.log(cmd.name);
                console.log(cmd.args);
                for (let i of this.parseInstruction(cmd)) {
                    parsedInstructions.push(i);
                }
            }
        }

        return parsedInstructions;
    }

    public parseInstruction(cmd): Array<Instruction> {
        switch (cmd.name.toLowerCase()) {
            case "arg":
                return this.parseArgInstruction(cmd);
            case "env":
                return this.parseEnvInstruction(cmd);
            case "expose":
                return this.parseExposeInstruction(cmd);
            case "volume":
                return this.parseVolumeInstruction(cmd);
        }

        return [];
    }

    /**
     * ARG <name>[=<default value>]
     */
    private parseArgInstruction(cmd): Array<Instruction> {
        if (!cmd.args[0].includes("=")) {
            return [new Instruction(cmd.args[0], "")]
        }

        let values = cmd.args[0].split("=", 2);
        return [new Instruction(values[0], values[1])];
    }

    /**
     * ENV <key> <value>
     *     Will set a single variable to a value. The entire string after the first space will be treated as the <value>
     *     - including characters such as spaces and quotes.
     *
     * ENV <key>=<value> ...
     *
     *     Allows for multiple variables to be set at one time
     */
    private parseEnvInstruction(cmd): Array<Instruction> {
        let values: Array<Instruction> = [];

        for (let key in cmd.args) {
            values.push(new Instruction(key, cmd.args[key]))
        }

        return values
    }

    /**
     * EXPOSE <port> [<port>...]
     */
    private parseExposeInstruction(cmd): Array<Instruction> {
        let values: Array<Instruction> = [];
        for (let value of cmd.args) {
            values.push(new Instruction("<expose>", value))
        }
        return values;
    }

    /**
     * VOLUME ["/data"]
     *
     * The value can be a JSON array, VOLUME ["/var/log/"], or a plain string with multiple arguments, such as VOLUME
     * /var/log or VOLUME /var/log /var/db
     *
     */
    private parseVolumeInstruction(cmd): Array<Instruction> {
        let values: Array<Instruction> = [];
        for (let value of cmd.args) {
            values.push(new Instruction("<volume>", value))
        }
        return values;
    }

    public contains(instruction) {
        return this.instructions.indexOf(instruction) > -1;
    }

}

export class Instruction {
    name: string;
    value: string;

    constructor(name: string, value: string) {
        this.name = name;
        this.value = value;
    }
}