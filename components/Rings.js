import { PieChart } from "react-native-gifted-charts";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    legendLeftCol: {
        flexDirection: "row",
        alignItems: "center"
    },
    legendRightCol: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end"
    }
});

function Legend(props) {
    const { macroData, calorieData, parentWidth } = props;

    return (
        <View style={{ flex: 3, alignItems: "flex-end", flexDirection: "row", width: parentWidth / 2 }}>
            <View style={{ flex: 3 }}>
                <View
                    style={styles.legendLeftCol}>
                    <Dot color={calorieData[0]["color"]} />
                    <Text style={{ color: "white" }}>Calories:</Text>
                </View>
                <View
                    style={styles.legendLeftCol}>
                    <Dot color={macroData[0]["color"]} />
                    <Text style={{ color: "white" }}>Protein:</Text>
                </View>
                <View
                    style={styles.legendLeftCol}>
                    <Dot color={macroData[1]["color"]} />
                    <Text style={{ color: "white" }}>Carbs:</Text>
                </View>
                <View
                    style={styles.legendLeftCol}>
                    <Dot color={macroData[2]["color"]} />
                    <Text style={{ color: "white" }}>Fat:</Text>
                </View>
            </View>

            <View style={{ flex: 3 }}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-end"
                    }}>
                    <Text style={{ color: "white", justifyContent: "flex-end" }}>
                        {calorieData[0]["value"]} kcal
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-end"
                    }}>
                    <Text style={{ color: "white", justifyContent: "flex-end" }}>
                        {macroData[0]["value"]}g
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-end"
                    }}>
                    <Text style={{ color: "white", justifyContent: "flex-end" }}>
                        {macroData[1]["value"]}g
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-end"
                    }}>
                    <Text style={{ color: "white", justifyContent: "flex-end" }}>
                        {macroData[2]["value"]}g
                    </Text>
                </View>
            </View>
        </View>
    );
};

function Dot(props) {
    const { color } = props;
    return (
        <View
            style={{
                height: 10,
                width: 10,
                borderRadius: 5,
                backgroundColor: color,
                marginRight: 10,
            }}
        />
    );
};

function MacrosRing(props) {
    const { macroData, radius, innerRadius } = props;
    return (
        <PieChart
            donut
            radius={radius}
            innerRadius={innerRadius}
            innerCircleColor={"#264653"}
            data={macroData}
        />
    );
}

export default function Rings(props) {
    const { parentHeight, parentWidth, calorieData } = props;
    const CALORIES_OUTER_RADIUS = Math.min(parentHeight / 2, parentWidth / 4) * 0.95;
    const CALORIES_INNER_RADIUS = CALORIES_OUTER_RADIUS * 0.8;
    const MACROS_OUTER_RADIUS = CALORIES_INNER_RADIUS - 5;
    const MACROS_INNER_RADIUS = MACROS_OUTER_RADIUS -
        (CALORIES_OUTER_RADIUS - CALORIES_INNER_RADIUS);

    return (
        <View
            style={{
                flexDirection: "row",
                height: parentHeight,
                width: parentWidth,
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <View style={{ flex: 3 }}>
                <PieChart
                    donut
                    radius={CALORIES_OUTER_RADIUS}
                    innerRadius={CALORIES_INNER_RADIUS}
                    innerCircleColor={"#264653"}
                    data={calorieData}
                    centerLabelComponent={() =>
                        MacrosRing({
                            ...props,
                            radius: MACROS_OUTER_RADIUS,
                            innerRadius: MACROS_INNER_RADIUS
                        })}
                />
            </View>

            <View
                style={{
                    flex: 3,
                    alignItems: "flex-end",
                    flexDirection: "row",
                    width: parentWidth / 2
                }}
            >
                <Legend {...props} />
            </View>
        </View>
    );
}