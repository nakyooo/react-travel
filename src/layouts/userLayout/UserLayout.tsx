import {FC} from 'react'
import styles from "./UserLayout.module.css";
import { Link } from "react-router-dom";
import { CaretDownOutlined } from "@ant-design/icons";
import { Layout, Menu, Dropdown, Button } from "antd";
import { MenuInfo } from "rc-menu/lib/interface";
import {changeLanguage} from '../../redux/language/languageSlice'
import {useDispatch} from 'react-redux'
import {useSelector} from '../../redux/hooks'
import {useTranslation} from 'react-i18next'

const { Header, Content } = Layout;

interface Props {
  children:any
}



export const UserLayout: FC<Props> = (props) => {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const language = useSelector(state =>state.language.language)
  const languageList = useSelector(state=>state.language.languageList)
  const menuClickHandler=(e:MenuInfo)=>{
    dispatch(changeLanguage(e.key))
  }

  return (
    <Layout className={styles["user-layout-container"]}>
      <Header className={styles["header"]}>
        <div className={styles["lang"]}>
          <Dropdown overlay={
            <Menu onClick={menuClickHandler}>
            {languageList.map(l=><Menu.Item key={l.code}>{l.name}</Menu.Item>)}
          </Menu>
          }>
            <Button>
              {" "}
              {language==='zh'?'中文':'English'} <CaretDownOutlined />
            </Button>
          </Dropdown>
        </div>
      </Header>
      <Content className={styles["content"]}>
        <div className={styles["top"]}>
          <div className={styles["content-header"]}>
            <Link to="/">
              <img alt="logo" className={styles["logo"]} src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAACWRJREFUeNrsXb9vXEUQXh9xEkJEnkU6BHpXpeRMh1L4XeE6Z+UP8LmhQEL2NVRI9klUNLabFJHQHRVV5HOdwi8FosNHSeULCIQQkV/ACgmBhJ3zPHNcbOvevdmdefv2k1a24tzu7cy3M7M/ZlcpDw8PDw8PDw+P0mGmTJ09vN0I9I+GLu/pUhv7c1+X73Tpzd3rJZ4Abik+1D/WdWlO+JGuLm1NhIEnQPGVv6l/rE358S1NgpYnQHHN/d4ppj4rwDXUXXULM1755SZBxVEDsEOofIV17bgoqIqDox/8fWSg6gjr9i5AuOk/0CUw1AS4gKpLrsA1C9A0qHyFdTddEphrBFh2pA3vAqYw/yGafxuourJI5JIFCB1tyyguCB/VDZyCLYz9CUZfum6fjsTI4leDtuIRy5PuL4wT4wGsIejv2PMuIJspX0ehThLQgSLaqJR1S1+zje2uT0g8mDUACcTtL8wIU/4aCnWaSD4xPAOgaCtBEmx5Aryq/I5rU6xz0NUkWPEEKKfyRZGgIkD5myVUPqCJfS+vBdACgABqT5UbsMsYl9UCbCoPVhlUmEd/zetf1VAWpbMAy173/LLgJEDD651fFiwEwH37wOv9BAHKxDq49gJYfP/MlYqanb+qXnv3ki6X//e3f354qssz9Xz/SL188oJLJnFZCGDXzF2fVZdvvaUu3nzzbEHceP3k97++/l093X2kXvz23HnZOE0AGPGg+EuLc5k+B0SB8uz+4ZAITBbB6SAwsaH8q5+8k1n5o4DPQh1QlwsyOVVOjOsAL00rH3w9BSA2OPr8R6OWYO5eb6ZMFgBg7JDEGx+/TaZ8ANQFdRZRFpIJsGuiUjDbowEdWbCk68zjTjhkUQQLQOr30qDPFKBuA/FAUkoLgMkVberRbzJgg7ov3rxGXW2bM9GEdTcQj0aRLX6cN88X2kbMfTxMwrHwJXV8yjdfR67PDotpQEBI1M4A+65KTQA0fyCIfl4CWBNa/ragr0sScgxFJIZoQQzz7/MEQyYif0NtQR/r2Gd2iFkKTi3B4e1GU//sKDexovvZlfSFRKWGofJdPia2iX30BDhF+R0c+VPti8NyrS3kaAv61sG+egKMKT/XyHjxyN7WLUFbTSkkkJAXsKEI8gJgVNrYtoU2iKyNiLyACrPyI0WY0AmneUyDuI01zhPBEiwAaTYvHN4wDQNtrJeSAMh8UvbDES44zmUKULeBY2KRzwsgxJ9f/WokFoA6oe4iyUI6AYychQdFwekdahg+EeTzAqjn6U+++IVEYVAH1GV4nYEtL4DLAhjPCwB/DaM2j8+Gz0IdJuMKmzI5DU4fC4dR+8fGw+FBkSyHRWDUw5FwKC4fCXeeAKkyYeoGyoSsoNn3r6oLN668Qgb4f39//0Q9//aIMzuoNARIOIgAptySOS+ETABO5gUUET4voNzweQElh88LKDF8XkDJwZoXwH5RpA4G91V5L4uCi6TnOb+AlLyAMrqC9Di8KjUB8PbseslIAH2tS7g5XFJeQFUx3JHDAOhjVUpegMT3Aprq+JRMmOFjXRxVtp51g3y+rA9IDTDg60qSt7gnY0BAulTRP3bV2XmDMJJaOJrg1u3HFr/mY2yzit8hPkfp0AdIA6tKU75IC5DDcsChCluvey5JfgYmC3JvBrW/+Wz8tu8+jsYBlv76B5/aCPBsBlRW2vrw/kcBTpFDLNfGp8x3F+/UWS2AJsDLCQUGxIBHlGJNiL4hK3CozN9AmujRP2dI4aDcSB0/klWbJA7SBJhhtQATImVwA0kzQL+5q8lAaUp7yvzjEz1ipYNMbqHiQ2UZXOcBQlRUU5MhwUBpW5Mhr2ltWyBAm0Dp0P9VZf6p20LMAgKcvh1APKFLlGMGkUbdptDNs3ijFR/pAjHTAfaZ/cJsCgswIDRdoPxIkwDcQ1tbhHiKOlpq8jcHM/l+rHsqxavJ3xi0GoxWJHyJM4iwhxYhzGgFhsusBr5TPeuuHZh6HPF7yszLps4SYJQI4Bo2dAkykABmGSuKZn8hwXl/P4PiA1020NRHBuUjggAPLbgqMJ/7WeIDXHWr5xTSAEd+L4Py4TvuKztJnw8lECBWdhCiW9jIaAnmMXJPMo56+Mx8xpG/gebe1nQut+wpFoLANB9aDl6h40tZVhgx9Wp0zh2covTh2oQ6fpU8yaB4qGtH2X3BfMjxu4t3ElYCIAkOGBYxBkgC1m1VXL3b4ei/Vn5VyjpAzCD71CXUmJW/x6B8MplTEYDrWHOAwWGTQflNDPa4FnN2JREgVrzo2CQBKp/7li85FgCDsZ4AEkQWlB8JUH4vb/BHbQE43cAodkzGBCMBHzfIZE1JAAmZPgEGhoEB5QcY8HFv4JBaWzICCHEDJyQwUK8E5ZOaf2oLANhWMlDTVmCTcPRDXVKyl0hlTH4oFM8IRkKEtZT3xBGe2NkR0p847xlA0xZgyAElB5088QD6fUlvF5DLlpwAeIgjFiKwvAqc+vp6Q6M/Fk8AgVagMc36AM73Gy6PfmMEQCsgKXGiY+kzJiP/uDAEQLSUnIzfMMtSMS71hkK++9RnEVkJgEe8JbmCzUkCQgz8JL1b1Najf1A4AiAJSF8GJQgIJ7ECTWGBn9GXRW3kBVAdzqTAKtH/sWX6V0w3YpwA6ApaQoR6biwgzPe3TJp+mxYASNBVx5cqSMDylH+ziS2t/K6NhqzeDyBombg6noeI+XoHQvx+3VZjtnMDcz8STYTGhP9mG31l+eYwqwTALeO6ABIsCzT/wwe0Kbd6xbmAEVeQ7tlzbrGeuAEB5p9F+RwuQJIlaAgx/2zKZyOAEBIsnPF7aZQPYH0yBkkwr11C7sejp0B0xu+20NWKX1HMEHNNnCYB3Jhhew2++tPRz4rB/7dML/GKdwGnWAMQCGTyDiw2W7MciELf5qUoXxQBkARpOveWgwTYQuX3Jclc7E2heIrH9GncHroAk7OAPpr8WKKcxV8Vi5s3WS+PnhQxEsBEEAjmvm1rTd9ZAiAJ0qvklomJkCABAmLFf6mON3TEv4FQuMui0SKsUrkGJACVqd+WPuILT4ARItSQCLnuBMxJgDQdbltacOc8AcbIACRYQDKEhgkwQKU/0Eov/JXxzrwXMEKGcGR6t6D+u6h6GgIMsDxAE9+3cUrHE8Ccy0hdRXQGAdKpWlJUk+7h4eHh4eHh4eHh4eHh4eHh4eHh8Sr+FWAAzdSoPix4/oMAAAAASUVORK5CYII="} />
              <span className={styles["title"]}>{t("register.title")}</span>
            </Link>
          </div>
          <div className={styles["desc"]}>
          {t("register.description")}
          </div>
          {props.children}
        </div>
      </Content>
    </Layout>
  );
};