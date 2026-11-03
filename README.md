# 9G client test project — Java

Java port of the C# test project: a Spring Boot Web API using the same
"aggregator + project subfolder" layout as `api/api.slnx` + `api/api/api.csproj`.

| C# original | Java here |
|---|---|
| `api/api.slnx` | `api/pom.xml` (aggregator, `<modules>`) |
| `api/api/api.csproj` | `api/api/pom.xml` (Spring Boot 3.5, Java 21) |
| `WeatherForecastController.cs` | `WeatherForecastController.java` |

Requires JDK 21+ and Maven 3.9+.

## Build

```bash
mvn -f api/pom.xml clean package
```

Output: `api/api/target/api-0.0.1-SNAPSHOT.jar`

## Test

```bash
mvn -f api/pom.xml test
```

## Run

```bash
java -jar api/api/target/api-0.0.1-SNAPSHOT.jar
```

Then `GET http://localhost:5125/weatherforecast`.
