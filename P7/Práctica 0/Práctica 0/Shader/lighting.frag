#version 330 core
struct Material
{
    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
    float shininess;
};

struct Light
{
    vec3 position;
    vec3 position1;
    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
};

in vec3 FragPos;
in vec3 Normal;
in vec2 TexCoords;

out vec4 color;

uniform vec3 viewPos;
uniform Material material;
uniform Light light;
uniform sampler2D texture_diffuse;

void main()
{
    vec3 norm = normalize(Normal);
    vec3 viewDir = normalize(viewPos - FragPos);

    //Luz 1
    vec3 lightDir = normalize(light.position - FragPos);
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 reflectDir = reflect(-lightDir, norm);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), material.shininess);

    vec3 ambient1 = light.ambient * material.diffuse;
    vec3 diffuse1 = light.diffuse * diff * material.diffuse;
    vec3 specular1 = light.specular * spec * material.specular;

    //Luz 2
    vec3 lightDir2 = normalize(light.position1 - FragPos);
    float diff2 = max(dot(norm, lightDir2), 0.0);
    vec3 reflectDir2 = reflect(-lightDir2, norm);
    float spec2 = pow(max(dot(viewDir, reflectDir2), 0.0), material.shininess);

    vec3 ambient2 = light.ambient * material.diffuse;
    vec3 diffuse2 = light.diffuse * diff2 * material.diffuse;
    vec3 specular2 = light.specular * spec2 * material.specular;

    vec3 result = (ambient1 + diffuse1 + specular1) + (ambient2 + diffuse2 + specular2);

    color = vec4(result, 1.0) * texture(texture_diffuse, TexCoords);
}
