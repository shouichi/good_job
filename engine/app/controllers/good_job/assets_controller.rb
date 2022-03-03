# frozen_string_literal: true
module GoodJob
  class AssetsController < ActionController::Base # rubocop:disable Rails/ApplicationController
    skip_before_action :verify_authenticity_token, raise: false

    JS_MODULES = {
      polling: GoodJob::Engine.root.join("app", "assets", "modules", "polling.js"),
      charts: GoodJob::Engine.root.join("app", "assets", "modules", "charts.js"),
    }

    before_action do
      expires_in 1.year, public: true
    end

    def bootstrap_css
      render file: GoodJob::Engine.root.join("app", "assets", "vendor", "bootstrap", "bootstrap.min.css")
    end

    def bootstrap_js
      render file: GoodJob::Engine.root.join("app", "assets", "vendor", "bootstrap", "bootstrap.bundle.min.js")
    end

    def chartjs_js
      render file: GoodJob::Engine.root.join("app", "assets", "vendor", "chartjs", "chart.min.js")
    end

    def rails_ujs_js
      render file: GoodJob::Engine.root.join("app", "assets", "vendor", "rails_ujs.js")
    end

    def scripts_js
      render file: GoodJob::Engine.root.join("app", "assets", "scripts.js")
    end

    def style_css
      render file: GoodJob::Engine.root.join("app", "assets", "style.css")
    end

    def modules_js
      module_name = params[:module].to_sym
      module_file = JS_MODULES[module_name] || (raise ActionController::RoutingError.new('Not Found'))
      render file: module_file
    end
  end
end
