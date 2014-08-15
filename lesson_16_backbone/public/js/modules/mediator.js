define([], function () {
	return {
		channels  : {},
		publish   : function (channel) {

			//если при публикации события нету подписчиков на канала (обработчиков события) то ничего не делаем
			if (!this.channels[channel]) {
				return false;
			}

			//превращаем массив аргументов в обычный массив убирая из списка имя события
			var args = Array.prototype.slice.call(arguments, 1);

			//перебираем все функции-подписчики и выполняем их передавая аргументы
			for (var i = 0, l = this.channels[channel].length; i < l; i++) {
				var subscription = this.channels[channel][i];
				subscription.callback.apply(subscription.context, args);
			}

			return this;
		},
		subscribe : function (channel, fn) {

			//проверяем если уже подписчики на этот канал информации
			if (!this.channels[channel]) {
				this.channels[channel] = [];
			}

			//добавляем обработчик в массив обработчиков для событий этого канала
			this.channels[channel].push({ context : this, callback : fn });

			return this;
		},
		initApplication: function () {

		}

	};
});