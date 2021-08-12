#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 iResolution;
uniform float iTime;

const float cResolution = 1.0 / 100.0;
const float cZoom = 1.0 / 2.0;
const float cTimeScaleX = 1.0 / 5.0;
const float cTimeScaleY = 1.0 / 2.5;
const float cContrast = 0.6;
const float cSpread = 0.5;

const vec3 cColorA = vec3(0.666, 0.0, 0.0);
const vec3 cColorB = vec3(1.0, 0.333, 1.0);

// Gradient Noise by Inigo Quilez - iq/2013
// https://www.shadertoy.com/view/XdXGW8

vec2 random2(vec2 _uv)
{
    vec2 uv = vec2(dot(_uv, vec2(127.1, 311.7)), dot(_uv, vec2(269.5, 183.3)));

    return -1.0 + 2.0 * fract(sin(uv) * 43758.5453123);
}


float noise(vec2 _uv)
{
    vec2 i = floor(_uv);
    vec2 f = fract(_uv);

    vec2 u = f * f * (3.0 - 2.0 * f);

    return
        mix(
            mix(
                dot(random2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
                dot(random2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)),
                u.x
            ),
            mix(
                dot(random2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
                dot(random2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)),
                u.x
            ),
            u.y
        );
}

// Scale to screen size
vec2 scale(vec2 _fragCoord)
{
    vec2 fc = _fragCoord.xy / iResolution.xy;

    return vec2(fc.x, 1.0 - fc.y);
}

// Pixelate to new resolution
vec2 pixelate(vec2 _position, vec2 _resolution)
{
    return floor(_position * _resolution) / _resolution;
}

void main(void)
{
    vec2 uv = scale(gl_FragCoord.xy);
    uv = pixelate(uv, iResolution.xy * cResolution);
    
    vec2 timeOffset = vec2(iTime * cTimeScaleX, iTime * cTimeScaleY);

    float n = noise((uv + timeOffset) / cZoom) * cContrast + cSpread;
    n = clamp(n, 0.0, 1.0);

    vec3 color = vec3(mix(cColorA, cColorB, n));

    gl_FragColor = vec4(color,1.0);
}