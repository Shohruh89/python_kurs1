import sys
import linecache

from markdown import markdown

from core import translation as t

for attr in "type value traceback".split():
    sys.__dict__.pop("last_" + attr, None)

old_getlines = linecache.getlines

from friendly_traceback.core import FriendlyTraceback
import friendly_traceback

linecache.getlines = old_getlines  # undo friendly monkeypatching

friendly_language = t.current_language or "en"
if friendly_language == "es-latam":
    friendly_language = "es"
friendly_traceback.set_lang(friendly_language)


def _use_repo_friendly_translation(lang):
    # friendly_traceback doesn't ship every language (e.g. uz),
    # so such translations live in translations/locales/<lang>/LC_MESSAGES/friendly_tb_<lang>.mo
    import gettext
    from friendly_traceback.ft_gettext import current_lang

    try:
        translation = gettext.translation(
            f"friendly_tb_{lang}",
            localedir=str(t.root_path / "locales"),
            languages=[lang],
        )
    except FileNotFoundError:
        return
    current_lang.lang = lang
    current_lang._translate = translation.gettext


if friendly_language != "en":
    _use_repo_friendly_translation(friendly_language)


def friendly_message(e, double_newline: bool):
    try:
        fr = FriendlyTraceback(type(e), e, e.__traceback__)
        fr.assign_generic()
        fr.assign_cause()

        return markdown(fr.info["generic"] + "\n" + double_newline * "\n" + fr.info.get("cause", ""))
    except (Exception, SystemExit):
        return ""
