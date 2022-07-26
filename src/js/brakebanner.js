class BrakeBanner {
	constructor(selector) {
		this.app = new PIXI.Application({
			width: window.innerWidth,
			height: window.innerHeight,
			backgroundColor: "0xcce8cf",
			resizeTo: window
		});
		document.querySelector(selector).appendChild(this.app.view)

		this.stage = this.app.stage

		this.loader = new PIXI.Loader()

		this.loader.add("btn.png", "images/btn.png");
		this.loader.add("btn_circle.png", "images/btn_circle.png");
		this.loader.add("brake_bike.png", "images/brake_bike.png");
		this.loader.add("brake_handlerbar.png", "images/brake_handlerbar.png");
		this.loader.add("brake_lever.png", "images/brake_lever.png");

		this.loader.load((loader, resources) => {
			// console.log(this.loader.resources["btn.png"]);
		})

		this.loader.onComplete.add(() => {
			this.show()
		})
	}

	show() {
		const actionButton = this.createActionButton()
		actionButton.x = window.innerWidth / 2
		actionButton.y = window.innerHeight / 2

		const bikeContainer = new PIXI.Container()
		this.stage.addChild(bikeContainer)

		bikeContainer.scale.x = bikeContainer.scale.y = 0.3

		const bikeImage = new PIXI.Sprite(this.loader.resources["brake_bike.png"].texture);
		bikeContainer.addChild(bikeImage);
		gsap.set(bikeImage, {
			alpha: 0.5
		});

		const brakeLever = new PIXI.Sprite(
			this.loader.resources["brake_lever.png"].texture
		);
		bikeContainer.addChild(brakeLever);

		brakeLever.pivot.x = 455
		brakeLever.pivot.y = 455

		brakeLever.x = 722
		brakeLever.y = 900

		brakeLever.rotation = (Math.PI / 180) * -15

		const brakeHandlerbar = new PIXI.Sprite(
			this.loader.resources["brake_handlerbar.png"].texture
		);
		bikeContainer.addChild(brakeHandlerbar);

		this.stage.addChild(actionButton);

		actionButton.interactive = true
		actionButton.buttonMode = true

		// actionButton.on('pointerdown', () => {
		// 	brakeLever.rotation = (Math.PI / 180) * -30;
		// })
		actionButton.on('mousedown', () => {
			// brakeLever.rotation = (Math.PI / 180) * -30;
			gsap.to(brakeLever, {
				duration: 0.3,
				rotation: (Math.PI / 180) * -38,
			});
			pause()
		})
		actionButton.on("mouseup", () => {
			// brakeLever.rotation = 0;
			gsap.to(brakeLever, {
                duration: 0.3,
                rotation: (Math.PI / 180) * -15,
            });
			start()
		});

		const resize = () => {
			bikeContainer.x = window.innerWidth - bikeContainer.width
			bikeContainer.y = window.innerHeight - bikeContainer.height;
		}
		window.addEventListener("resize", resize);
		resize()

		//创建粒子
		const particleContainer = new PIXI.Container()
		this.stage.addChild(particleContainer);

		particleContainer.pivot.x = window.innerWidth / 2
		particleContainer.pivot.y = window.innerHeight / 2
		particleContainer.x = window.innerWidth / 2;
		particleContainer.y = window.innerHeight / 2;
		particleContainer.rotation = 35 * Math.PI / 180

		let particles = []
		let colors = [
			"0xf1cf54",
			"0xb5cea8",
			"0x8134ea",
			"0x09ac34",
			"0xac8733",
			"0xff0065"
		];

		for (let i = 0; i < 100; i++) {
			let gr = new PIXI.Graphics()
			gr.beginFill(colors[Math.floor(Math.random() * colors.length)])
			gr.drawCircle(0, 0, 6)
			gr.endFill()
			let pItem = {
				sx: Math.random() * innerWidth,
				sy: Math.random() * innerHeight,
				gr: gr
			};
			gr.x = pItem.sx
			gr.y = pItem.sy
			particleContainer.addChild(gr)
			particles.push(pItem)
		}
		let speed = 0
		const loop = () => {

			speed += 0.5
			speed = Math.min(speed, 20)

			for (let i = 0; i < particles.length; i++) {
				let pItem = particles[i];
				pItem.gr.y += speed
				if (speed >= 10 && speed < 20) {
					// pItem.gr.scale.y = 20
					// pItem.gr.scale.x = 0.3
					gsap.to(pItem.gr.scale, {
						duration: 0.2,
						x: 0.3,
						y: 20
                    });
				}
				if (speed >= 20) {
					// pItem.gr.scale.y = 40
					// pItem.gr.scale.x = 0.03
					gsap.to(pItem.gr.scale, {
                        duration: 0.2,
                        x: 0.1,
                        y: 40,
                    });
				}
				if (pItem.gr.y > window.innerHeight) {
					pItem.gr.y = 0
				}
			}
		}
		const start = () => {
			speed = 0
			gsap.ticker.add(loop)
			gsap.to(bikeImage, {
                duration: 0.5,
                alpha: 0.5,
            });
		}
		const pause = () => {
			gsap.ticker.remove(loop)
			for (let i = 0; i < particles.length; i++) {
				let pItem = particles[i]
				// pItem.gr.scale.y = 1
				// pItem.gr.scale.x = 1
				gsap.to(pItem.gr.scale, {
                    duration: 0.2,
                    x: 1,
                    y: 1,
                });
				gsap.to(pItem.gr, {
					duration: 0.6,
					x: pItem.sx,
					y: pItem.sy,
					ease: 'elastic.out'
				});
			}
			gsap.to(bikeImage, {
				duration: 0.5,
                alpha: 1,
            });
		}
		start()
	}

	createActionButton() {

		const actionButton = new PIXI.Container()

		const btnImage = new PIXI.Sprite(
			this.loader.resources["btn.png"].texture
		);
		const btnCircle = new PIXI.Sprite(
			this.loader.resources["btn_circle.png"].texture
		);
		const btnCircle2 = new PIXI.Sprite(
			this.loader.resources["btn_circle.png"].texture
		);

		actionButton.addChild(btnImage)
		actionButton.addChild(btnCircle)
		actionButton.addChild(btnCircle2)

		btnImage.pivot.x = btnImage.width / 2
		btnImage.pivot.y = btnImage.height / 2

		btnCircle.pivot.x = btnCircle.width / 2
		btnCircle.pivot.y = btnCircle.height / 2

		btnCircle2.pivot.x = btnCircle2.width / 2
		btnCircle2.pivot.y = btnCircle2.height / 2

		btnCircle.scale.x = btnCircle.scale.y = 0.8
		gsap.to(btnCircle.scale, {
			duration: 1,
			x: 1.3,
			y: 1.3,
			repeat: -1,
		});
		gsap.to(btnCircle, {
			duration: 1,
			alpha: 0,
			repeat: -1,
		});
		return actionButton
	}

}
