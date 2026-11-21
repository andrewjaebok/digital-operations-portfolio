"""Render the original Andrew Pocket artwork. Run with Python and Pillow."""
from pathlib import Path
from random import Random

from PIL import Image, ImageDraw

OUT = Path(__file__).resolve().parents[1] / "public/images/andrew-pocket"
OUT.mkdir(parents=True, exist_ok=True)

INK = "#263934"
DARK = "#375648"
CREAM = "#f2dba4"
GOLD = "#eec37b"
WOOD = "#694938"
WOOD_MID = "#9e6f4b"
WOOD_LIGHT = "#c69661"
GLASS = "#396e77"
GLASS_LIGHT = "#80c2bb"
ROOFS = [
    ("#2e5053", "#477976", "#63a098", "#9ac1a7"),
    ("#413e54", "#65647f", "#85839c", "#aba6bd"),
    ("#674337", "#a26046", "#c98258", "#edab70"),
]
GROVE = (
    ("#2d483c", "#41664a", "#68864f", ("#779659","#527749","#607c49","#8d9f5a")),
    ("#2f463b", "#435f42", "#708454", ("#81915c","#566d4b","#738650","#969e62")),
    ("#56493a", "#806242", "#b2894f", ("#c19a59","#947447","#af824a","#d9aa65")),
)
FLOWERS = ("#e7ae6b", "#efcb86", "#d89b9f", "#efe3af")


def rect(d, coords, color):
    d.rectangle(coords, fill=color)


def line(d, coords, color, width=1):
    d.line(coords, fill=color, width=width)


def poly(d, coords, color):
    d.polygon(coords, fill=color)


def image(size, color=None):
    canvas = Image.new("RGB" if color else "RGBA", size, color or (0, 0, 0, 0))
    return canvas, ImageDraw.Draw(canvas)


def base_shadow(d, x, y, w, h=4, color="#557347"):
    poly(d, [(x + 3, y), (x + w - 5, y), (x + w, y + h - 2),
             (x + w - 4, y + h), (x, y + h), (x, y + 2)], color)


def tuft(d, x, y, color="#537c4c"):
    line(d, [(x, y - 2), (x + 2, y)], color)
    line(d, [(x + 2, y), (x + 3, y - 3)], color)
    rect(d, (x + 1, y + 1, x + 3, y + 1), "#86a366")


def blossom(d, x, y, color):
    line(d, [(x, y - 3), (x, y + 1), (x - 2, y + 2)], "#507145")
    rect(d, (x - 2, y - 4, x + 2, y - 3), color)
    rect(d, (x - 1, y - 5, x + 1, y - 2), color)
    d.point((x, y - 4), "#fff0b7")


def tree(d, x, y, seed, scale=1, tone=0):
    """Tree anchor is its feet. All foliage uses upper-left lighting."""
    s = scale
    outline, shade, light, leaf_colors = GROVE[tone]

    def points(vertices):
        return [(round(x + u * s), round(y + v * s)) for u, v in vertices]

    base_shadow(d, x - round(14*s), y - 1, round(29*s), 4)
    poly(d, points([(-4, 0), (-2, -9), (1, -21), (4, -21), (4, -8),
                    (6, 0), (3, 1), (0, -1)]), "#5a4734")
    line(d, points([(0, -13), (0, -6), (-2, -1)]), WOOD_LIGHT)
    canopy = [(-15,-15),(-15,-25),(-12,-25),(-12,-31),(-8,-31),(-8,-35),
              (-2,-35),(-2,-38),(6,-38),(6,-35),(12,-35),(12,-32),
              (16,-32),(16,-25),(19,-25),(19,-15),(15,-15),(15,-11),
              (9,-11),(9,-8),(-3,-8),(-3,-10),(-10,-10),(-10,-13),(-15,-13)]
    poly(d, points(canopy), outline)
    interior = [(int(u*.90), int((v+23)*.86-23)) for u,v in canopy]
    poly(d, points(interior), shade)
    poly(d, points([(-13,-23),(-11,-29),(-7,-29),(-7,-33),(-1,-33),(-1,-35),
                    (7,-35),(7,-33),(11,-33),(11,-29),(14,-29),(14,-24),
                    (10,-24),(10,-20),(6,-20),(6,-22),(1,-22),(1,-18),
                    (-6,-18),(-6,-15),(-10,-15),(-10,-20),(-13,-20)]), light)
    reference_colors = tuple(bytes.fromhex(color[1:]) for color in (light, shade))
    rng = Random(seed)
    for _ in range(40):
        u, v = rng.randrange(-11, 13), rng.randrange(-33, -12)
        px, py = points([(u,v)])[0]
        if (0 <= px < d._image.width and 0 <= py < d._image.height
                and bytes(d._image.getpixel((px,py))[:3]) in reference_colors):
            line(d, [(px,py),(px+1,py)], rng.choice(leaf_colors))


def bush(d, x, y, tone=0):
    base_shadow(d, x-8, y-3, 18, 3)
    poly(d, [(x-8,y-2),(x-8,y-6),(x-6,y-6),(x-6,y-9),(x-2,y-9),
             (x-2,y-11),(x+3,y-11),(x+3,y-8),(x+7,y-8),(x+7,y-5),
             (x+9,y-5),(x+9,y-2),(x+5,y),(x-5,y)], "#3d6445")
    poly(d, [(x-6,y-3),(x-6,y-7),(x-2,y-7),(x-2,y-9),(x+2,y-9),
             (x+2,y-6),(x+6,y-6),(x+6,y-3)], "#638e50")
    for off, ah in [(-4,-5),(0,-7),(4,-4)]:
        rect(d, (x+off,y+ah,x+off+1,y+ah), FLOWERS[tone] if tone else "#84a75a")


def bench(d, x, y):
    base_shadow(d, x-2, y-1, 26, 3)
    rect(d, (x+2,y-10,x+3,y), WOOD)
    rect(d, (x+19,y-10,x+20,y), WOOD)
    rect(d, (x,y-13,x+22,y-7), WOOD)
    line(d, [(x+1,y-12),(x+21,y-12)], WOOD_LIGHT, 2)
    poly(d, [(x,y-6),(x+22,y-6),(x+24,y-3),(x+1,y-3)], WOOD_MID)
    line(d, [(x+1,y-5),(x+22,y-5)], GOLD)
    line(d, [(x+1,y-2),(x+24,y-2)], "#483a32")


def lantern(d, x, y):
    base_shadow(d, x-5, y-1, 15, 3)
    rect(d, (x-1,y-14,x+1,y), "#3e5146")
    line(d, [(x,y-12),(x,y-2)], "#778575")
    rect(d, (x-4,y-20,x+4,y-13), INK)
    rect(d, (x-3,y-19,x+3,y-15), "#e0a35e")
    rect(d, (x-2,y-19,x+1,y-16), "#f9d889")
    poly(d, [(x-5,y-20),(x-2,y-23),(x+2,y-23),(x+5,y-20)], INK)
    d.point((x-1,y-22), "#728373")


def fence(d, x, y, count):
    for i in range(count):
        px = x + i*9
        rect(d, (px,y-8,px+2,y+1), WOOD)
        line(d, [(px,y-8),(px+1,y-9),(px+2,y-8)], WOOD_LIGHT)
    rect(d, (x-2,y-6,x+(count-1)*9+4,y-5), WOOD_MID)
    rect(d, (x-2,y-3,x+(count-1)*9+4,y-2), "#aa8055")


def studio_planter(d, x, y):
    base_shadow(d,x-3,y+1,29,4)
    poly(d,[(x,y),(x+4,y-7),(x+23,y-7),(x+25,y),(x+24,y+3),(x,y+3)],"#566852")
    poly(d,[(x+1,y),(x+5,y-6),(x+22,y-6),(x+24,y)],"#bda27d")
    rect(d,(x+4,y-3,x+22,y-1),"#705d48")
    for i in range(4):
        blossom(d,x+6+i*4,y-3-i%2,FLOWERS[i])


def utility_cabinet(d, x, y):
    base_shadow(d,x-4,y,23,4)
    rect(d,(x,y-17,x+16,y+1),INK)
    rect(d,(x+1,y-15,x+12,y),"#7b7d87")
    line(d,[(x+2,y-14),(x+12,y-14)],"#a6abb0")
    for i in range(3):
        line(d,[(x+3,y-10+i*3),(x+10,y-10+i*3)],"#4c535d")
    d.point((x+10,y-2),"#b8dca2")


def cobbles(canvas, mask, seed, colors):
    rng = Random(seed)
    tile, d = image(canvas.size, colors[0])
    for row,y in enumerate(range(-4,canvas.height,5)):
        x = -9 - row%2*4
        while x < canvas.width:
            width = rng.randrange(5,11)
            poly(d, [(x+1,y),(x+width-2,y),(x+width-1,y+1),(x+width-1,y+3),
                     (x+width-2,y+4),(x+1,y+4),(x,y+3),(x,y+1)], rng.choice(colors[1:]))
            line(d,[(x+1,y),(x+width-2,y)],colors[-1])
            if width > 7 and rng.random() < .36:
                d.point((x+2,y+2),colors[0])
            x += width + 1
    canvas.paste(tile,(0,0),mask)


def town_light(canvas, lamps):
    # Quantized warm pools and a cooler tree line tie outdoor light to the workshop palette.
    scaled = [(x*canvas.width/400,y*canvas.height/200,r) for x,y,r in lamps]
    for y in range(canvas.height):
        for x in range(canvas.width):
            warm = max(max(0,1-((x-lx)*400/canvas.width/r)**2-((y-ly)*200/canvas.height/r)**2)
                       for lx,ly,r in scaled)
            warm = round(warm*10)/10
            shade = max(0,1-y/canvas.height*1.57)
            r,g,b = canvas.getpixel((x,y))
            canvas.putpixel((x,y),tuple(max(0,min(255,v)) for v in (
                round(r+47*warm-17*shade),round(g+24*warm-11*shade),round(b+5*warm+5*shade))))


def town(mobile=False):
    ground, d = image((400,200),"#596e47")
    rng = Random(816)
    for points, color in [
        ([(0,0),(399,0),(399,36),(367,49),(302,38),(273,60),(247,54),
          (211,44),(174,54),(145,47),(97,57),(52,47),(0,65)],"#415e46"),
        ([(0,86),(33,76),(67,93),(91,113),(145,94),(188,112),(219,94),
          (268,107),(312,81),(366,64),(399,76),(399,135),(368,149),(0,147)],"#65794d"),
        ([(0,173),(48,166),(85,172),(142,167),(155,179),(204,187),(253,171),
          (306,174),(351,180),(399,172),(399,199),(0,199)],"#495f47"),
        ([(0,88),(49,87),(58,105),(39,132),(48,154),(11,151),(0,137)],"#4c6547"),
        ([(252,88),(286,76),(311,89),(303,117),(285,140),(256,142),(242,115)],"#4f6849"),
    ]:
        poly(d,points,color)
    for _ in range(2900):
        x,y=rng.randrange(400),rng.randrange(200)
        if rng.random() < .13:
            line(d,[(x,y),(x+1,y)],"#75844f")
        else:
            d.point((x,y),rng.choice(("#61754b","#54694a","#65794f","#556b46","#697c4f")))
    for x,y in [(13,88),(51,62),(138,99),(112,135),(146,124),(162,78),
                (243,109),(270,119),(288,91),(383,110),(381,145),(324,181),(138,180)]:
        for _ in range(6):
            tuft(d,x+rng.randrange(-6,7),y+rng.randrange(-5,6),"#455d44")

    main = [(-12,165),(26,157),(63,156),(101,149),(141,150),(174,157),
            (209,158),(241,151),(277,148),(311,151),(351,164),(410,163)]
    wings = [[(75,86),(76,112),(86,130),(101,149)],
             [(205,73),(206,100),(220,123),(226,155)],
             [(325,115),(324,132),(311,151)]]
    terraces = [
        [(23,78),(126,78),(129,87),(125,108),(28,108),(20,100)],
        [(161,67),(244,67),(253,78),(249,98),(181,98),(161,88)],
        [(284,107),(379,106),(383,129),(375,143),(300,143),(285,132)],
    ]
    plaza = [(164,150),(170,139),(189,134),(223,135),(241,145),
             (248,163),(239,177),(219,183),(182,181),(163,169)]

    pavement = Image.new("L",ground.size)
    for padding,color,target in [(7,"#3c5444",ground), (4,"#ae916e",ground), (0,255,pavement)]:
        paving = ImageDraw.Draw(target)
        for points,width in [(main,29),*((path,17) for path in wings)]:
            r = (width+padding)//2
            paving.line(points,fill=color,width=2*r+1,joint="curve")
            for x,y in points:
                paving.ellipse((x-r,y-r,x+r,y+r),fill=color)
        for points in [plaza,*terraces]:
            paving.polygon(points,fill=color)
            if padding:
                paving.line(points+[points[0]],fill=color,width=padding+1,joint="curve")

    if mobile:
        # Pave the resized shape at phone scale to keep individual stones proportional.
        ground = ground.resize((244,224),Image.Resampling.NEAREST)
        pavement = pavement.resize(ground.size,Image.Resampling.NEAREST)
    cobbles(ground,pavement,246,("#887760","#a48b6f","#aa9073","#b69a7c","#b09b80","#c2a686","#c5ad8d"))
    d = ImageDraw.Draw(ground)

    def prop(draw, x, y, *args):
        if not mobile:
            draw(d,x,y,*args)
            return
        tile,tile_draw = image((76,64))
        draw(tile_draw,24,51,*args)
        tile = tile.resize((54,45),Image.Resampling.NEAREST)
        ground.paste(tile,(round(x*244/400)-17, round(y*224/200)-36),tile)

    trees = [(5,54,1.12,1),(26,58,.88,0),(101,24,.88,1),(129,32,1.02,0),
             (142,62,1.06,0),(162,64,.72,2),(251,36,.93,1),(272,55,1.13,0),
             (305,49,1.17,1),(344,54,1.04,2),(381,58,1.25,0),(400,87,.99,1),
             (16,113,.88,2),(42,137,.96,0),(127,132,.71,2),(268,106,.89,2),
             (393,142,.91,1),(14,201,1.05,0),(68,207,.87,1),(279,204,.81,0),(373,207,1.06,2)]
    for x,y,scale,tone in trees:
        prop(tree,x,y,x+y,scale,tone)
    for x,y,tone in [(16,71,1),(118,81,2),(151,84,0),(248,70,0),(292,76,2),
                     (370,94,3),(30,122,0),(111,120,3),(141,138,1),(161,124,0),
                     (249,125,2),(271,128,1),(382,145,0),(92,182,3),(332,191,2)]:
        prop(bush,x,y,tone)
    for x,y,n in [(19,116,3),(133,107,3),(256,77,3),(369,80,3),(375,184,3)]:
        prop(fence,x,y,n)
    for x,y in [(54,139),(181,177),(343,145)]:
        prop(bench,x,y)
    prop(studio_planter,29,103)
    prop(studio_planter,98,103)
    prop(utility_cabinet,235,89)
    prop(carton,359,127,12,9,"#cf9d68")
    prop(carton,369,125,9,7,"#b28159")
    for x,y in [(34,111),(42,118),(119,121),(144,115),(155,132),(265,120),
                (287,114),(383,145),(112,187),(156,185),(248,191),(354,190)]:
        for i in range(4):
            prop(blossom,x+rng.randrange(-4,5),y+rng.randrange(-2,3),FLOWERS[i])
    for x,y in [(101,122),(220,108),(300,130),(25,159),(368,172),(238,176)]:
        prop(lantern,x,y)
    town_light(ground,[(101,119,35),(220,105,34),(300,125,35),(25,156,26),
                       (368,169,30),(238,174,40),(75,86,27),(325,115,29)])
    ground.save(OUT/("town-phone.png" if mobile else "town.png"), optimize=True)


def window(d, x, y, w=16, h=16, light=GLASS_LIGHT):
    rect(d,(x-2,y-2,x+w+1,y+h+1),INK)
    rect(d,(x-1,y-1,x+w,y+h),WOOD_MID)
    rect(d,(x,y,x+w-1,y+h-1),GLASS)
    poly(d, [(x+1,y+1),(x+w-3,y+1),(x+2,y+h-3),(x+1,y+h-3)], light)
    line(d,[(x+int(w*.52),y),(x+int(w*.52),y+h-1)],CREAM,1)
    line(d,[(x,y+int(h*.55)),(x+w-1,y+int(h*.55))],CREAM,1)
    rect(d,(x-2,y+h,x+w+1,y+h+2),WOOD)
    line(d,[(x-1,y+h),(x+w,y+h)],GOLD)


def facade(district, door_frame):
    canvas, d = image((112,73))
    shade, mid, light, trim = ROOFS[district]
    base_shadow(d,4,63,104,8,(27,43,32,115))

    if district == 0:
        # A low storefront with tall glass panels and a little entrance awning.
        poly(d,[(5,31),(15,21),(105,21),(110,28),(110,61),(102,66),(5,66)],INK)
        rect(d,(7,34,99,63),"#b8ad88")
        poly(d,[(100,35),(108,29),(108,60),(100,64)],"#777d6c")
        rect(d,(8,38,98,57),shade)
        for x,w in [(12,11),(25,13),(72,11),(86,10)]:
            rect(d,(x,39,x+w,56),"#315d65")
            rect(d,(x+1,40,x+w-1,54),"#8ba48b")
            poly(d,[(x+1,40),(x+w-2,40),(x+1,49)],"#dfc48d")
            line(d,[(x+1,48),(x+w-1,48)],"#3e7a80")
            line(d,[(x+1,55),(x+w-1,55)],"#dbad68")
            d.point((x+w-2,51),"#e6cc96")
        poly(d,[(3,31),(15,20),(103,20),(109,26),(100,33),(3,33)],shade)
        poly(d,[(6,30),(16,22),(101,22),(96,29)],mid)
        for x in range(14,98,6):
            line(d,[(x,29),(x+6,23)],light)
        line(d,[(5,31),(100,31),(108,26)],trim,2)
        rect(d,(39,32,69,36),shade)
        rect(d,(46,33,62,34),"#b9e1c9")
        for x in (7,89):
            rect(d,(x,60,x+11,64),WOOD)
            for i in range(0,12,2):
                line(d,[(x+i,60),(x+i,56-i%3)],"#82a25d")
        poly(d,[(39,43),(43,38),(68,38),(73,43)],light)
        line(d,[(39,43),(73,43)],shade,2)
    elif district == 1:
        # Raised steel core, stepped utility wing, antenna and louvers.
        poly(d,[(25,12),(36,4),(69,4),(79,12),(79,29),(98,29),(105,36),
                (105,62),(97,66),(15,66),(15,39),(25,34)],INK)
        rect(d,(27,15,72,63),"#a49daf")
        poly(d,[(73,15),(77,12),(77,62),(73,65)],shade)
        rect(d,(17,40,26,62),mid)
        rect(d,(79,37,96,63),"#777888")
        poly(d,[(97,37),(103,33),(103,60),(97,64)],shade)
        poly(d,[(25,12),(36,5),(69,5),(77,12),(72,15),(25,15)],mid)
        line(d,[(28,12),(72,12),(76,9)],trim,2)
        line(d,[(30,16),(30,62)],light)
        line(d,[(68,16),(68,62)],shade,2)
        line(d,[(34,3),(34,0),(61,0)],shade)
        d.point((61,0),"#ffaa6f")
        for y in (22,28,34):
            rect(d,(35,y,64,y+3),shade)
            line(d,[(37,y+1),(61,y+1)],light)
            d.point((62,y+2),"#9cd69b")
        for x,y in [(29,18),(69,19),(29,57),(69,57),(81,40),(94,58)]:
            d.point((x,y),trim)
        for y in range(42,59,4):
            line(d,[(81,y),(94,y)],shade,2)
            d.point((83,y),"#9bbb9b")
        line(d,[(93,32),(98,32),(101,38),(101,57)],"#c18a63")
        rect(d,(34,40,71,43),shade)
        line(d,[(36,40),(69,40)],trim)
    else:
        # Gabled maker shop with an open-sided loading porch and parcels.
        poly(d,[(9,31),(29,10),(62,10),(84,36),(102,36),(109,43),(109,59),
                (102,65),(88,65),(81,68),(10,68),(6,61),(6,37)],INK)
        rect(d,(9,34,80,62),"#c3996b")
        for row,y in enumerate(range(43,62,4)):
            line(d,[(9,y),(80,y)],"#ac7953")
            for x in range(12+row%2*11,77,19):
                line(d,[(x,y+1),(x,y+3)],"#a87753")
                line(d,[(x+3,y+1),(x+7,y+1)],"#d5a974")
        poly(d,[(8,35),(29,10),(52,10),(75,35)],shade)
        poly(d,[(11,34),(31,12),(51,12),(70,34)],mid)
        poly(d,[(52,10),(80,32),(85,38),(74,36)],shade)
        for y in range(17,34,4):
            left=30-(y-13)*4//5
            right=51+(y-13)*4//5
            line(d,[(left,y),(right,y)],shade)
            for x in range(left+2,right,7):
                line(d,[(x,y+1),(min(x+3,right),y+1)],light)
        line(d,[(10,34),(31,12),(50,12),(71,34)],trim,2)
        rect(d,(37,22,47,31),shade)
        rect(d,(39,24,45,29),"#f9c278")
        window(d,15,46,15,11,"#f5ca85")
        poly(d,[(73,38),(99,36),(108,42),(106,46),(73,46)],shade)
        line(d,[(76,39),(99,38),(105,42)],trim,2)
        rect(d,(77,46,105,61),"#856348")
        for x in (77,104):
            rect(d,(x,45,x+2,63),WOOD)
            line(d,[(x,46),(x,61)],WOOD_LIGHT)
        for x,y,w in [(82,53,9),(91,51,9),(87,59,10)]:
            carton(d,x,y,w,6,"#d59560")
        line(d,[(10,63),(80,63),(86,61),(105,61)],GOLD,2)

    rect(d,(44,43,67,65),WOOD)
    rect(d,(46,44,65,65),INK)
    rect(d,(47,45,64,65),"#26363c")
    if door_frame == 0:
        rect(d,(47,45,64,65),shade)
        rect(d,(48,46,63,57),mid)
        rect(d,(50,47,61,54),"#748479")
        line(d,[(51,48),(60,48)],"#ecd092")
        line(d,[(55,47),(55,54)],CREAM)
        line(d,[(50,61),(61,61)],light)
        d.point((61,59),GOLD)
    else:
        last = 54 if door_frame == 1 else 49
        poly(d,[(47,45),(last,46),(last,65),(47,65)],mid)
        line(d,[(last,46),(last,64)],light)
        rect(d,(max(last+1,52),62,64,65),GOLD)
    rect(d,(42,65,69,67),"#84755b")
    line(d,[(43,65),(68,65)],CREAM)
    line(d,[(44,67),(67,67)],"#b7a078")
    return canvas


def pot(d,x,y):
    base_shadow(d,x-6,y,13,3,"#ad8b64")
    poly(d,[(x-5,y-6),(x+5,y-6),(x+3,y+2),(x-3,y+2)],WOOD)
    rect(d,(x-4,y-5,x+3,y-2),"#ba7757")
    line(d,[(x,y-6),(x,y-14)],"#52794d",2)
    poly(d,[(x,y-8),(x-6,y-8),(x-7,y-14),(x-2,y-13)],"#50784b")
    poly(d,[(x,y-10),(x+5,y-15),(x+7,y-16),(x+7,y-12),(x+3,y-9)],"#79a25a")


def workshop():
    rng = Random(212)
    canvas, d = image((400,200),"#453a39")
    rect(d,(0,0,399,63),"#59443d")
    for y in range(0,60,7):
        line(d,[(0,y),(399,y)],"#493934")
        for x in range((y*3)%31,400,31):
            line(d,[(x,y+1),(x,y+6)],"#503e37")
    # Deep purple tile and timber frame the arcade bay.
    rect(d,(263,4,389,74),"#393747")
    for x in range(266,389,7):
        line(d,[(x,5),(x,71)],"#464153")
    for x in (7,249,389):
        rect(d,(x,0,x+5,68),"#382e2d")
        line(d,[(x+1,0),(x+1,67)],"#79523c")
    rect(d,(0,62,399,66),"#3c3331")
    line(d,[(0,63),(399,63)],"#977251")

    # Broad plank perspective, with light falling from the work lights and windows.
    lamps=[(76,120,97,72),(196,99,117,69),(326,121,70,66)]
    for y in range(67,200):
        for x in range(400):
            warmth=max(0, *(1-(((x-lx)/rx)**2+((y-ly)/ry)**2)**.5 for lx,ly,rx,ry in lamps))
            row=(y-67)//7
            joint=(x+row*29)%62
            tone=(row*9+(x+row*29)//62*5)%11-5
            seam=-13 if (y-67)%7==6 or joint==0 else (5 if (y-67)%7==0 else 0)
            grain=rng.choice((-2,0,0,0,1,3)) if (y%7)%2 else 0
            if x > 260:
                color=(118+warmth*40,80+warmth*33,61+warmth*31)
            else:
                color=(141+warmth*64,96+warmth*50,67+warmth*37)
            d.point((x,y),tuple(round(c+tone+seam+grain) for c in color))
    poly(d,[(275,102),(367,102),(388,140),(383,163),(276,163),(260,149)],"#493f55")
    poly(d,[(278,104),(366,104),(385,140),(380,160),(277,160),(263,148)],"#7d5968")
    poly(d,[(280,107),(365,107),(382,141),(377,157),(278,157),(266,148)],"#5a465f")
    for y in range(119,157,5):
        for x in range(281+y%3,378,7):
            d.point((x,y),"#71536b")
    for x in (278, 368):
        line(d,[(x,148),(x+6,155)],"#ad826f",2)

    window(d,22,15,38,26,"#b2c299")
    line(d,[(21,44),(62,44)],"#d29c61",2)
    rect(d,(68,11,110,37),"#44332d")
    rect(d,(70,13,108,35),"#9b7959")
    for x in range(72,108,4):
        for y in range(16,34,4):
            d.point((x,y),"#5c483a")
    line(d,[(75,19),(76,27),(83,30)],"#e1bc7a",2)
    rect(d,(90,17,92,29),"#568a80")
    rect(d,(98,16,105,25),"#e3c692")
    line(d,[(100,19),(103,19)],"#9d775a")

    for y in (22,46):
        rect(d,(120,y,162,y+4),"#3d302a")
        line(d,[(120,y),(162,y)],"#ad774f")
        for x in range(124,160,8):
            h=rng.randrange(5,10)
            rect(d,(x,y-h,x+5,y-1),rng.choice(("#966d50","#ca915c","#7a7c63","#bd774f")))
            d.point((x+2,y-h+2),"#e6c088")

    # Deep window bay and the hanging brass lamp above the model.
    window(d,174,10,48,34,"#82aa9d")
    rect(d,(172,46,224,52),"#4c3832")
    line(d,[(172,47),(224,47)],"#b58a63")
    line(d,[(198,0),(198,32)],"#3d2e2b",2)
    poly(d,[(189,33),(194,29),(202,29),(209,33),(209,35),(189,35)],"#c48d56")
    line(d,[(191,35),(207,35)],"#f8d899",2)
    for x,y in [(228,39),(235,43),(240,38)]:
        rect(d,(x,y,x+4,49),"#a47c60")
        d.point((x+2,y+2),"#d9bc82")

    rect(d,(278,12,295,31),"#282636")
    rect(d,(280,14,293,28),"#885d83")
    poly(d,[(281,25),(285,18),(290,26)],"#d28a9b")
    rect(d,(345,17,365,36),"#292735")
    rect(d,(347,19,363,34),"#806648")
    poly(d,[(350,31),(353,23),(359,31)],"#e8b879")
    for x in (269,377):
        rect(d,(x,20,x+2,43),"#747092")
        line(d,[(x,21),(x,41)],"#aaaa9d")
    for x,y,w,h,c in [(17,120,15,14,"#a97853"),(27,129,13,12,"#c59764"),
                      (127,112,16,11,"#b7865b"),(377,88,13,12,"#987253")]:
        carton(d,x,y,w,h,c)
    pot(d,237,101)

    # Brass threshold and a compact doormat at the entrance.
    rect(d,(176,185,225,197),"#725140")
    rect(d,(179,186,222,195),"#906343")
    for x in range(182,221,3):
        line(d,[(x,187),(x,194)],"#aa7c51")
    line(d,[(174,198),(227,198)],"#c89560",2)
    canvas.save(OUT/"room-2.png",optimize=True)


def interior(district):
    if district == 2:
        workshop()
        return
    roof_dark, roof, roof_light, roof_rim = ROOFS[district]
    rng = Random(110 + district)
    canvas,d=image((400,200),"#c4a479")
    rect(d,(0,0,399,79),roof)
    for y in range(4,74,8):
        line(d,[(0,y),(399,y)],roof_dark)
        line(d,[(0,y+1),(399,y+1)],roof_light)
        for x in range(y%3*21,399,49):
            line(d,[(x,y+2),(x,y+7)],roof_dark)
    rect(d,(0,68,399,71),roof_dark)
    rect(d,(0,72,399,73),roof_rim)
    rect(d,(0,74,399,80),WOOD)
    line(d,[(0,75),(399,75)],WOOD_LIGHT)
    strip=("#cca97e","#d1b78d","#d8bd91","#c6a278")
    for row,y in enumerate(range(81,200,8)):
        for x in range(-48+(row*21)%48,400,48):
            rect(d,(x,y,x+46,y+6),strip[rng.randint(0,3)])
            line(d,[(x,y),(x+46,y)],"#e0c497")
            for _ in range(3):
                start=rng.randrange(x+1,x+37)
                gy=y+rng.randrange(2,6)
                line(d,[(start,gy),(start+rng.randrange(2,8),gy)],"#bea077")
        line(d,[(0,y+7),(399,y+7)],"#ab8a63")
    for x in (30,340):
        window(d,x,36,29,24, "#99c7c0" if district!=1 else "#adbcd4")
        rect(d,(x-2,63,x+31,65),roof_dark)
        rect(d,(x,62,x+29,62),ROOFS[district][3])
    for x in (117,247):
        rect(d,(x,40,x+29,61),roof_dark)
        rect(d,(x+1,41,x+28,60),CREAM)
        rect(d,(x+3,43,x+26,57),"#f0daa8")
        for i in range(3):
            line(d,[(x+7,46+i*3),(x+21-(i%2)*4,46+i*3)],roof_light)
    rect(d,(174,58,226,62),WOOD)
    line(d,[(175,58),(225,58)],WOOD_LIGHT)
    for i in range(8):
        x=177+i*6
        h=rng.randrange(6,13)
        rect(d,(x,57-h,x+3,57),rng.choice([roof_dark,CREAM,"#bb795f",roof_light]))
        line(d,[(x+1,58-h),(x+1,55)],"#d7b881")
    # Each rug shares a border and weave, with its district's color as the field.
    base_shadow(d,88,120,230,48,"#ad8d68")
    poly(d,[(92,117),(308,117),(318,125),(318,163),(309,171),
            (91,171),(82,163),(82,125)],roof_dark)
    poly(d,[(93,120),(307,120),(315,127),(315,161),(308,168),
            (92,168),(85,161),(85,127)],CREAM)
    poly(d,[(95,123),(305,123),(312,129),(312,159),(306,165),
            (94,165),(88,159),(88,129)],roof)
    for y in range(127,165,3):
        for x in range(92+(y%2)*2,309,5):
            d.point((x,y),roof_light)
    for x in (109,291):
        poly(d,[(x,134),(x+12,143),(x,152),(x-12,143)],roof_dark)
        poly(d,[(x,137),(x+8,143),(x,149),(x-8,143)],roof_rim)
    line(d,[(130,144),(270,144)],roof_rim)
    rect(d,(191,178,209,185),WOOD_MID)
    line(d,[(191,178),(209,178)],GOLD)
    for x in (23,377):
        pot(d,x,114)
        pot(d,x+(5 if x<100 else -5),163)
    for x in (0,397):
        rect(d,(x,0,x+2,199),roof_dark)
    canvas.save(OUT/f"room-{district}.png",optimize=True)


def desk(d, x=9, y=44, w=56, hue=WOOD_MID):
    base_shadow(d,x-4,y+9,w+12,4,(44,47,39,96))
    rect(d,(x+2,y+3,x+5,y+12),INK)
    rect(d,(x+w-6,y+3,x+w-3,y+12),INK)
    rect(d,(x,y,x+w,y+9),WOOD)
    rect(d,(x+1,y+1,x+w-1,y+6),hue)
    poly(d,[(x-1,y),(x+4,y-5),(x+w-4,y-5),(x+w+1,y)],WOOD_LIGHT)
    line(d,[(x,y),(x+w,y)],GOLD)
    line(d,[(x+9,y+5),(x+w-12,y+5)],WOOD)


def crt(d,x,y,mode):
    rect(d,(x+6,y+19,x+19,y+23),INK)
    poly(d,[(x,y+4),(x+4,y),(x+24,y),(x+28,y+4),(x+28,y+20),(x,y+20)],INK)
    rect(d,(x+2,y+3,x+26,y+17),"#74867b")
    rect(d,(x+4,y+4,x+24,y+15),"#2d635e")
    rect(d,(x+5,y+5,x+23,y+13),"#6eaaa1")
    line(d,[(x+6,y+6),(x+22,y+6)],"#b9d6b7")
    if mode=="grid":
        for v in range(8,23,5):
            line(d,[(x+v,y+9),(x+v,y+13)],"#477d76")
    else:
        for i in range(3):
            line(d,[(x+7,y+8+i*2),(x+20-i*3,y+8+i*2)],"#cfdebc")
    d.point((x+24,y+18),"#b5d98e")


def carton(d,x,y,w=9,h=10,color="#d89866"):
    poly(d,[(x,y+2),(x+3,y),(x+w,y),(x+w,y+h-1),(x+w-3,y+h+2),(x,y+h+2)],WOOD)
    rect(d,(x+1,y+3,x+w-3,y+h),color)
    line(d,[(x+2,y+2),(x+w-2,y+2)],GOLD)
    line(d,[(x+w-2,y+3),(x+w-2,y+h-1)],WOOD_MID)
    if w>6:
        line(d,[(x+3,y+5),(x+3,y+7)],CREAM)


def station(name, pulse=0):
    canvas,d=image((72,58))
    if name=="counter":
        desk(d,6,43,60,"#668c80")
        crt(d,16,18,"grid")
        carton(d,51,30,8,8,"#ebd197")
        rect(d,(48,42,58,43),"#eee2b6")
        rect(d,(12,46,29,49),"#375952")
        line(d,[(14,47),(26,47)],"#abbb92")
    elif name=="pads":
        desk(d,8,43,56,"#b09371")
        rect(d,(15,21,55,40),INK)
        rect(d,(17,23,53,38),"#859697")
        for x,y in [(20,27),(32,27),(39,32)]:
            rect(d,(x,y,x+13,y+9),"#bfaf89")
            rect(d,(x,y,x+12,y+6),"#f5e5b7")
            line(d,[(x+2,y+2),(x+8,y+2)],"#849a92")
            line(d,[(x+2,y+4),(x+10,y+4)],"#adbdad")
        rect(d,(11,41,60,42),"#a6b09f")
        rect(d,(30,46,43,48),INK)
        line(d,[(32,47),(41,47)],GOLD)
    elif name=="directory":
        desk(d,7,43,57,"#658989")
        crt(d,12,17,"list")
        for x,y,c in [(43,34,"#aaa2b4"),(49,27,"#bd9469"),(54,22,"#75a098")]:
            rect(d,(x,y,x+4,42),INK)
            rect(d,(x+1,y+1,x+3,40),c)
            d.point((x+2,y+4),CREAM)
        rect(d,(13,46,59,49),"#43645e")
        for x in (21,36,51):
            line(d,[(x,47),(x+3,47)],GOLD)
    elif name=="rack":
        base_shadow(d,14,51,47,4,(32,46,37,118))
        poly(d,[(17,9),(22,4),(51,4),(57,10),(57,49),(51,54),(17,54)],INK)
        rect(d,(19,11,49,51),"#5a6371")
        poly(d,[(19,10),(23,6),(50,6),(54,10)],"#888594")
        poly(d,[(51,12),(55,9),(55,48),(51,51)],"#424858")
        for i,y in enumerate(range(13,48,8)):
            rect(d,(22,y,47,y+5),"#293942")
            line(d,[(23,y+1),(44,y+1)],"#4d6170")
            for x in (24,27,30):
                color="#b0d798" if (x+i+pulse)%3 else "#77aa83"
                d.point((x,y+3),color)
            rect(d,(39,y+3,44,y+3),"#848f99")
        line(d,[(54,22),(61,27),(61,44),(58,50)],"#926852")
        line(d,[(55,31),(58,35),(58,46)],"#b3a077")
    elif name=="automation":
        desk(d,5,43,60,"#71758f")
        crt(d,9,17,"grid")
        rect(d,(40,27,61,39),INK)
        rect(d,(41,27,60,36),"#8c899a")
        rect(d,(43,29,57,34),"#f1dda9")
        line(d,[(45,31),(55,31)],"#a0918d")
        for x in (43,48,53,58):
            d.point((x,37),"#dea96d" if x==43+pulse*5 else "#b5d1a4")
        rect(d,(25,41,56,43),"#bab1a0")
    elif name=="model":
        desk(d,4,43,63,"#594c43")
        poly(d,[(1,37),(10,26),(62,26),(70,37),(63,45),(8,45)],INK)
        poly(d,[(3,37),(12,27),(60,27),(67,37),(61,43),(9,43)],"#6b9a67")
        poly(d,[(8,37),(20,34),(26,38),(23,42),(12,42)],"#588d95")
        line(d,[(15,34),(25,33),(32,37),(48,32),(59,38)],"#ead1a0",2)
        for x,y,w,c in [(14,25,9,"#50807c"),(30,20,11,"#9388a5"),
                        (48,26,10,"#ca8b60"),(40,34,7,"#669487")]:
            rect(d,(x,y-4,x+w,y+4),"#dbce9c")
            poly(d,[(x-2,y-4),(x+2,y-8),(x+w-2,y-8),(x+w+2,y-4)],c)
            rect(d,(x+w//2,y,x+w//2+1,y+4),INK)
            d.point((x+2,y),"#ffdf99")
        for x,y in [(11,40),(25,31),(60,33),(63,40),(30,41),(7,37)]:
            rect(d,(x,y-5,x+1,y-1),"#3a6859")
            rect(d,(x-1,y-6,x+2,y-4),"#9ab677")
        rect(d,(14,47,56,50),"#6e5947")
        line(d,[(17,48),(53,48)],"#aa8a63")
    elif name=="bench":
        desk(d,4,42,63,"#a47856")
        poly(d,[(3,40),(13,29),(59,29),(68,40),(65,44),(4,44)],"#7e593f")
        poly(d,[(6,39),(14,30),(58,30),(65,39),(62,42),(8,42)],"#cc9b66")
        for x,y,c,accent in [(12,32,"#d1a774","#ad5840"),(24,29,"#e6c897","#47796f"),
                              (37,34,"#bf855d","#703f37"),(50,30,"#ead2a5","#a35641")]:
            poly(d,[(x,y-12),(x+7,y-13),(x+9,y-1),(x+1,y+1)],INK)
            poly(d,[(x+1,y-11),(x+6,y-12),(x+8,y-2),(x+2,y)],c)
            line(d,[(x+2,y-6),(x+6,y-7)],accent,2)
            d.point((x+5,y-4),accent)
        poly(d,[(49,38),(59,35),(63,37),(54,41)],"#efdbad")
        line(d,[(52,38),(58,36)],"#a97155")
        line(d,[(9,39),(16,36)],"#657b73",2)
        rect(d,(38,46,62,51),"#7f5736")
        line(d,[(47,48),(54,48)],GOLD)
    else:
        base_shadow(d,11,51,53,5,(32,34,38,156))
        poly(d,[(12,9),(19,2),(53,2),(60,9),(59,48),(54,55),(13,55)],INK)
        rect(d,(15,10,51,53),"#785e87")
        poly(d,[(52,12),(58,8),(57,48),(52,52)],"#524760")
        line(d,[(16,12),(16,50)],"#aa7b9c")
        line(d,[(56,13),(56,47)],"#955f80")
        rect(d,(17,6,50,16),"#b77563")
        rect(d,(19,7,48,13),"#eab077")
        line(d,[(23,10),(42,10)],"#f8d78d",2)
        rect(d,(18,19,50,36),"#242f46")
        rect(d,(20,21,48,34),"#548486")
        poly(d,[(22,32),(29,26),(36,28),(41,24),(47,30),(47,33),(22,33)],"#88ab84")
        rect(d,(28+pulse*4,27,30+pulse*4,29),"#ffe398")
        poly(d,[(18,36),(50,36),(51,42),(17,42)],"#d59c76")
        rect(d,(24,36,26,39),INK)
        rect(d,(23,34,27,36),"#b65555")
        rect(d,(39,38,41,39),"#7e4857")
        rect(d,(44,37,46,38),"#516e83")
        rect(d,(26,46,42,51),"#423a52")
        line(d,[(30,48),(37,48)],"#c09682")
    return canvas


def sprite(direction, frame):
    """Centered head, weighted coat and opposing leg and arm contact."""
    canvas,d=image((24,32))
    phase=(0,1,0,-1,0)[frame]
    step=1 if frame in (1,3) else 0
    bob=1 if frame in (2,4) else 0
    hair="#352f30"
    teal="#427f78"
    light="#69a497"
    shade="#345c59"
    skin="#e5ab78"
    face_high="#f3c38a"
    pants="#4a515b"
    shoes="#322f34"
    # Ground shadow must stay anchored when the body moves.
    poly(d,[(5,28),(17,28),(21,29),(21,30),(17,31),(5,31),(2,30),(2,29)],
         (33,48,36,95))
    for x,dy in [(7,phase),(13,-phase)]:
        rect(d,(x,22,x+3,27+dy),INK)
        rect(d,(x+1,23,x+3,26+dy),pants)
        rect(d,(x,26+dy,x+4,28+dy),shoes)
        line(d,[(x+1,27+dy),(x+3,27+dy)],"#aa8d72")
    cy=15+bob
    poly(d,[(6,cy),(9,cy-2),(15,cy-2),(18,cy),(19,cy+7),
            (16,cy+9),(8,cy+9),(5,cy+7)],INK)
    rect(d,(7,cy,16,cy+7),teal)
    rect(d,(8,cy,15,cy+1),light)
    line(d,[(8,cy+2),(8,cy+6)],light)
    rect(d,(7,cy+7,16,cy+8),shade)
    for x,dy in [(4,-phase),(17,phase)]:
        rect(d,(x,cy+2+dy,x+2,cy+6+dy),shade)
        rect(d,(x,cy+5+dy,x+2,cy+6+dy),skin)
    if direction=="up":
        rect(d,(8,cy+2,15,cy+7),WOOD)
        rect(d,(9,cy+2,14,cy+6),"#cd9b65")
        line(d,[(9,cy+3),(14,cy+3)],CREAM)
        rect(d,(11,cy+4,12,cy+5),"#6b6252")
    else:
        line(d,[(12,cy+1),(12,cy+7)],shade)
        line(d,[(13,cy+2),(14,cy+2)],GOLD)
    hy=3+bob
    poly(d,[(8,hy),(16,hy),(16,hy+1),(19,hy+1),(19,hy+8),(17,hy+8),
            (16,hy+11),(8,hy+11),(7,hy+8),(5,hy+8),(5,hy+2),(8,hy+2)],hair)
    if direction!="up":
        poly(d,[(8,hy+3),(16,hy+3),(16,hy+6),(18,hy+6),(17,hy+9),
                (15,hy+11),(9,hy+11),(7,hy+8),(7,hy+5)],skin)
        rect(d,(8,hy+5,15,hy+8),face_high)
        rect(d,(6,hy+2,17,hy+4),hair)
        rect(d,(6,hy+4,8,hy+5),hair)
        line(d,[(9,hy+2),(15,hy+2)],"#715142")
        if direction=="down":
            for x in (9,14):
                d.point((x,hy+6),INK)
            d.point((12,hy+9),"#aa695b")
        else:
            rect(d,(15,hy+6,16,hy+6),INK)
            rect(d,(17,hy+8,18,hy+8),skin)
            rect(d,(8,hy+6,9,hy+8),skin)
    else:
        rect(d,(7,hy+3,17,hy+8),hair)
        line(d,[(8,hy+2),(16,hy+2)],"#705043")
        line(d,[(8,hy+4),(13,hy+4)],"#5c443c")
        rect(d,(9,hy+9,15,hy+10),skin)
    if direction in ("left","right"):
        # The side stride swings shoes forward and back along the same baseline.
        if step:
            rect(d,(4,25,19,28),(0,0,0,0))
            rect(d,(6+phase*2,25,10+phase*2,27),pants)
            rect(d,(13-phase*2,25,17-phase*2,27),pants)
            line(d,[(6+phase*2,28),(10+phase*2,28)],shoes)
            line(d,[(13-phase*2,28),(17-phase*2,28)],shoes)
        if direction=="left":
            canvas=canvas.transpose(Image.Transpose.FLIP_LEFT_RIGHT)
    return canvas


if __name__=="__main__":
    town()
    town(mobile=True)
    for district in range(3):
        interior(district)
        atlas=Image.new("RGBA",(336,73))
        for frame in range(3):
            atlas.paste(facade(district,frame),(112*frame,0))
        atlas.save(OUT/f"district-{district}.png",optimize=True)
    for kind in ("counter","pads","directory","rack","automation","model","bench","arcade"):
        frames=3 if kind in ("rack","automation","arcade") else 1
        atlas=Image.new("RGBA",(72*frames,58))
        for frame in range(frames):
            atlas.paste(station(kind,frame),(frame*72,0))
        atlas.save(OUT/f"station-{kind}.png",optimize=True)
    atlas=Image.new("RGBA",(120,128))
    for row,direction in enumerate(("down","left","right","up")):
        for frame in range(5):
            atlas.paste(sprite(direction,frame),(24*frame,32*row))
    atlas.save(OUT/"andrew.png",optimize=True)
